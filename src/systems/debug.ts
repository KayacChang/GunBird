import { IEntity, ISystem } from '@kayac/ecs.js';
import { ICollider, ITransform } from '../components';

export function DebugSystem(): ISystem {
  return {
    id: DebugSystem.name,

    filter: new Set(['collider', 'transform']),

    update(delta: number, entities: IEntity[]) {
      entities.forEach((entity) => {
        const collider = entity.get('collider') as ICollider;

        const { position } = entity.get('transform') as ITransform;

        (collider.debug.get('transform') as ITransform).position = position;
      });
    },
  };
}
