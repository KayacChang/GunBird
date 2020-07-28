import { Vector2 } from '../../constants';
import { System, Entity } from '../../ecs';
import { IControl, IMovement, ITransform } from './types';
import { normalize } from '../../functions';

function maptoDir(keys: Set<string>): Vector2 {
  let [x, y] = [0, 0];

  if (keys.has('w')) y += -1;
  if (keys.has('s')) y += 1;
  if (keys.has('a')) x += -1;
  if (keys.has('d')) x += 1;

  return [x, y];
}

export function Movement(): IMovement {
  return { name: 'movement', speed: 5 };
}

export function MovementSystem(): System {
  return {
    filter: new Set(['control', 'movement', 'transform']),

    update(delta: number, entities: Entity[]) {
      //
      entities.forEach((entity) => {
        //
        const { keys } = entity.get('control') as IControl;
        const transform = entity.get('transform') as ITransform;
        const { speed } = entity.get('movement') as IMovement;

        const [dx, dy] = normalize(maptoDir(keys));

        const [vx, vy] = [dx * speed * delta, dy * speed * delta];

        const [x, y] = transform.position;

        transform.position = [x + vx, y + vy];
      });
    },
  };
}
