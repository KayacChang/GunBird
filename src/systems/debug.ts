import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ICollider, ITransform } from '../components';

export function DebugSystem(): ISystem {
  return {
    id: DebugSystem.name,

    filter: ['collider', 'transform'],

    update(delta: number, entities: IEntity[]) {
      entities.forEach((entity) => {
        const collider = ECS.component.get('collider', entity) as ICollider;

        const { position } = ECS.component.get('transform', entity) as ITransform;

        const debugTransform = ECS.component.get('transform', collider.debug) as ITransform;
        debugTransform.position = position;
      });
    },
  };
}
