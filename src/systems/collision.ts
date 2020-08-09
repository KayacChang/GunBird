import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { ICollider, ITransform } from '../components';
import { hitTest } from '../functions';

export function CollisionSystem(layers: string[]): ISystem {
  return {
    id: CollisionSystem.name,

    filter: ['collider', 'transform'],

    update(delta: number, entities: IEntity[]) {
      const map = new Map(
        layers.map((layer) => {
          const targets = entities.filter((entity) => {
            const collider = ECS.component.get('collider', entity) as ICollider;

            return collider.layer === layer;
          });

          return [layer, targets];
        })
      );

      const colliding = new Map<IEntity, IEntity[]>();

      entities.forEach((entityA) => {
        const colliderA = ECS.component.get('collider', entityA) as ICollider;

        colliderA.masks.forEach((mask) => {
          const transformA = ECS.component.get('transform', entityA) as ITransform;
          const shapeA = { ...colliderA.shape, position: transformA.position };

          map.get(mask)?.forEach((entityB) => {
            const colliderB = ECS.component.get('collider', entityB) as ICollider;
            const transformB = ECS.component.get('transform', entityB) as ITransform;
            const shapeB = { ...colliderB.shape, position: transformB.position };

            if (hitTest(shapeA, shapeB)) {
              colliding.set(entityA, [...(colliding.get(entityA) || []), entityB]);
              colliding.set(entityB, [...(colliding.get(entityB) || []), entityA]);
            }
          });
        });
      });

      colliding.forEach((targets, entity) => {
        const collider = ECS.component.get('collider', entity) as ICollider;

        collider.colliding = targets;
      });
    },
  };
}
