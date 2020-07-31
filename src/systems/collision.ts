import { ISystem, IEntity } from '@kayac/ecs.js';
import { ICollider } from '../components';
import { hitTest } from '../functions';

function detectCollision(a: ICollider, b: ICollider) {
  const isHit = hitTest(a.shape, b.shape);

  a.isColliding = isHit;
  b.isColliding = isHit;
}

export function CollisionSystem(groups: string[]): ISystem {
  return {
    id: CollisionSystem.name,

    filter: new Set(['collider', 'transform']),

    update(delta: number, entities: IEntity[]) {
      //
      groups
        .map((group) =>
          entities.filter((entity) => {
            const collider = entity.get('collider') as ICollider;

            return collider.group === group;
          })
        )
        .forEach((group) => {
          //
          for (let i = 0; i < group.length; i++) {
            //
            for (let j = i + 1; j < group.length; j++) {
              const colliderA = group[i].get('collider') as ICollider;
              const colliderB = group[j].get('collider') as ICollider;

              detectCollision(colliderA, colliderB);
            }
          }
          //
        });
    },
  };
}
