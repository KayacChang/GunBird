import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ISpeed, IShoot } from '../components';
import { Vector2 } from '../constants';
import { normalize } from '../functions';
import { Movement } from '../components';

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

    filter: new Set(['control', 'speed', 'shoot']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const keys = getInputs();

        const { value } = entity.get('speed') as ISpeed;
        const [mx, my] = normalize(maptoDir(keys)).map((dv) => dv * value * delta);
        ECS.component.add(Movement([mx, my]), entity);

        const shoot = entity.get('shoot') as IShoot;
        shoot.fire = keys.has(' ');
      });
    },
  };
}
