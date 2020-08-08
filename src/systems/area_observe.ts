import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { ITransform, IAreaListener } from '../components/types';
import { Vec2, Rect } from '../constants';

function inRange([min, max]: Vec2, num: number) {
  return min <= num && num <= max;
}

function inArea(area: Rect, [x, y]: Vec2) {
  const [ax, ay] = area.position;
  const [aw, ah] = area.size;
  return inRange([ax, ax + aw], x) && inRange([ay, ay + ah], y);
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
