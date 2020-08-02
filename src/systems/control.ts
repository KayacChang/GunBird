import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ISpeed, IShoot, ITransform } from '../components';
import { Vector2 } from '../constants';
import { normalize } from '../functions';

function KeyBoard() {
  const keys = new Set<string>();

  document.addEventListener('keydown', ({ key }) => keys.add(key));
  document.addEventListener('keyup', ({ key }) => keys.delete(key));

  return () => keys;
}

function maptoDir(keys: Set<string>): Vector2 {
  return [
    //
    Number(keys.has('d')) - Number(keys.has('a')),
    Number(keys.has('s')) - Number(keys.has('w')),
  ];
}

export function ControlSystem(): ISystem {
  const getInputs = KeyBoard();

  return {
    id: ControlSystem.name,

    filter: ['control', 'speed', 'transform', 'shoot'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const keys = getInputs();

        const { value } = ECS.component.get('speed', entity) as ISpeed;
        const transform = ECS.component.get('transform', entity) as ITransform;

        const [mx, my] = normalize(maptoDir(keys)).map((dv) => dv * value * delta);
        const [x, y] = transform.position;
        transform.position = [x + mx, y + my];

        const shoot = ECS.component.get('shoot', entity) as IShoot;
        shoot.fire = keys.has(' ');
      });
    },
  };
}
