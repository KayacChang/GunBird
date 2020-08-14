import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { ITransform, IAreaListener } from '../components/types';
import { Rect } from '../constants';
import { Vec2, vec2 } from '@kayac/vec2';

function inRange(v: Vec2, num: number) {
  const [min, max] = vec2(v);
  return min <= num && num <= max;
}

function inArea(area: Rect, v: Vec2) {
  const [x, y] = vec2(v);
  const [ax, ay] = vec2(area.position);
  const [aw, ah] = vec2(area.size);
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
