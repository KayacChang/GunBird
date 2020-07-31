import { ISystem, IEntity } from '@kayac/ecs.js';
import { IBoundary, ITransform } from '../components';
import { clamp } from '../functions';

export function BoundarySystem(): ISystem {
  return {
    id: BoundarySystem.name,

    filter: new Set(['boundary', 'transform']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { rect } = entity.get('boundary') as IBoundary;

        const transform = entity.get('transform') as ITransform;

        const [x, y] = transform.position;

        transform.position = [
          //
          clamp(x, rect.x, rect.w),
          clamp(y, rect.y, rect.h),
        ];
      });
    },
  };
}
