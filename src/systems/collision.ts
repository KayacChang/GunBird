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

      entities.forEach((entity) => {
        const colliderA = ECS.component.get('collider', entity) as ICollider;
        const transformA = ECS.component.get('transform', entity) as ITransform;
        const shapeA = { ...colliderA.shape, position: transformA.position };

        colliderA.masks.forEach((mask) => {
          map.get(mask)?.forEach((entity) => {
            const colliderB = ECS.component.get('collider', entity) as ICollider;
            const transformB = ECS.component.get('transform', entity) as ITransform;
            const shapeB = { ...colliderB.shape, position: transformB.position };

            const isHit = hitTest(shapeA, shapeB);
            colliderA.isColliding = colliderA.isColliding || isHit;
            colliderB.isColliding = colliderB.isColliding || isHit;
          });
        });
      });
    },
  };
}
