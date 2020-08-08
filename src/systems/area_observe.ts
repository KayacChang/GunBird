import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { ITransform, IAreaListener } from '../components/types';
import { Vector2, Rect } from '../constants';

function inRange([min, max]: Vector2, num: number) {
  return min <= num && num <= max;
}

function inArea(area: Rect, [x, y]: Vector2) {
  return inRange([area.x, area.x + area.w], x) && inRange([area.y, area.y + area.h], y);
}

export function AreaObserveSystem(): ISystem {
  return {
    id: AreaObserveSystem.name,

    filter: ['area_listener', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const area = ECS.component.get('area_listener', entity) as IAreaListener;
        const transform = ECS.component.get('transform', entity) as ITransform;

        area.hasEnter = inArea(area.rect, transform.position);
      });
    },
  };
}
