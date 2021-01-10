import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IBoundary, ITransform } from '../components';
import { clamp } from '../functions';
import { vec2 } from '@kayac/vec2';

export function BoundarySystem(): ISystem {
  return {
    id: BoundarySystem.name,

    filter: ['boundary', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { rect } = ECS.component.get('boundary', entity) as IBoundary;

        const transform = ECS.component.get('transform', entity) as ITransform;

        const [x, y] = vec2(transform.position);

        const [rx, ry] = vec2(rect.position);
        const [rw, rh] = vec2(rect.size);

        transform.position = [clamp(x, rx, rw), clamp(y, ry, rh)];
      });
    },
  };
}
