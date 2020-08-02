import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { ICollider } from '../components';
import { hitTest } from '../functions';

function detectCollision(a: ICollider, b: ICollider) {
  if (hitTest(a.shape, b.shape)) {
    a.isColliding = true;
    b.isColliding = true;
  }
}

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
              const colliderB = ECS.component.get('collider', group[j]) as ICollider;

              detectCollision(colliderA, colliderB);
            }
          }
        });
    },
  };
}
