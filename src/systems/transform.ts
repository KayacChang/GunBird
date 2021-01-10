import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { IRenderer, ITransform } from '../components/types';
import { vec2 } from '@kayac/vec2';

export function TransformSystem(): ISystem {
  return {
    id: TransformSystem.name,

    filter: ['renderer', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { view } = ECS.component.get('renderer', entity) as IRenderer;
        const { position } = ECS.component.get('transform', entity) as ITransform;

        const [x, y] = vec2(position);
        view.position.set(x, y);
      });
    },
  };
}
