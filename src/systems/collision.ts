import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { ICollider, ITransform } from '../components';
import { hitTest } from '../functions';

export function CollisionSystem(groups: string[]): ISystem {
  return {
    id: CollisionSystem.name,

    filter: ['collider', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      groups
        .map((group) =>
          entities.filter((entity) => {
            const collider = ECS.component.get('collider', entity) as ICollider;

            return collider.group === group;
          })
        )
        .forEach((group) => {
          for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
              const colliderA = ECS.component.get('collider', group[i]) as ICollider;
              const transformA = ECS.component.get('transform', group[i]) as ITransform;
              const shapeA = { ...colliderA.shape, position: transformA.position };

              const colliderB = ECS.component.get('collider', group[j]) as ICollider;
              const transformB = ECS.component.get('transform', group[j]) as ITransform;
              const shapeB = { ...colliderB.shape, position: transformB.position };

              const isHit = hitTest(shapeA, shapeB);
              colliderA.isColliding = colliderA.isColliding || isHit;
              colliderB.isColliding = colliderB.isColliding || isHit;
            }
          }
        });
    },
  };
}
