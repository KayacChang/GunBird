import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IBoundary, ITransform } from '../components';
import { clamp } from '../functions';

export function BoundarySystem(): ISystem {
  return {
    id: BoundarySystem.name,

    filter: ['boundary', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { rect } = ECS.component.get('boundary', entity) as IBoundary;

        const transform = ECS.component.get('transform', entity) as ITransform;

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
