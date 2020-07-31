import { ISystem, IEntity } from '@kayac/ecs.js';
import { ICollider } from '../components';
import { hitTest } from '../functions';

export function CollisionSystem(groups: string[]): ISystem {
  return {
    id: CollisionSystem.name,

    filter: new Set(['collider', 'transform']),

    update(delta: number, entities: IEntity[]) {
      //
      groups.forEach((group) => {
        //
        entities
          .filter((entity) => {
            const collider = entity.get('collider') as ICollider;

            return collider.group === group;
          })
          .forEach((target, index, entitiesInGroup) => {
            //
            entitiesInGroup.forEach((test) => {
              if (test === target) {
                return;
              }

              const targetCollider = target.get('collider') as ICollider;
              const testCollider = test.get('collider') as ICollider;

              const { stay, onEnter, onStay, onLeave } = targetCollider;
              const isHit = hitTest(targetCollider.shape, testCollider.shape);

              if (stay && isHit) {
                onStay && onStay();

                return;
              }

              if (isHit) {
                onEnter && onEnter();

                targetCollider.stay = true;
                return;
              }

              if (stay && !isHit) {
                onLeave && onLeave();

                targetCollider.stay = false;
                return;
              }
            });
          });
      });
    },
  };
}
