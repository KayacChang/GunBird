import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { IControl, IArmament, ISpeed, ITransform } from '../components';
import { ACTION } from '../constants';
import { normal, Vec2, vec2 } from '@kayac/vec2';

function mapToDir(action: string[]): Vec2 {
  return [
    Number(action.includes(ACTION.RIGHT)) - Number(action.includes(ACTION.LEFT)),
    Number(action.includes(ACTION.DOWN)) - Number(action.includes(ACTION.UP)),
  ];
}

export function ControlSystem(): ISystem {
  return {
    id: ControlSystem.name,

    filter: ['control', 'armament', 'speed', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { released, pressed } = ECS.component.get('control', entity) as IControl;
        const armament = ECS.component.get('armament', entity) as IArmament;

        if (pressed.includes(ACTION.SHOOT)) {
          armament.hasCharged += delta;
        }

        armament.fire = released.includes(ACTION.SHOOT);

        const { value } = ECS.component.get('speed', entity) as ISpeed;
        const transform = ECS.component.get('transform', entity) as ITransform;

        const [dx, dy] = normal(mapToDir(pressed));
        const [x, y] = vec2(transform.position);
        transform.position = [x + dx * value * delta, y + dy * value * delta];
      });
    },
  };
}
