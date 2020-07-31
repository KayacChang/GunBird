import { IEntity, ISystem } from '@kayac/ecs.js';
import { IRenderer, ITransform } from '../components/types';

export function TransformSystem(): ISystem {
  return {
    id: TransformSystem.name,

    filter: new Set(['renderer', 'transform']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        const { view } = entity.get('renderer') as IRenderer;
        const { position } = entity.get('transform') as ITransform;

        const [x, y] = position;
        view.position.set(x, y);
      });
    },
  };
}
