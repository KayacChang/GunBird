import { IEntity, ISystem } from '../ecs';
import { IControl } from './types';

function KeyBoard() {
  const keys = new Set<string>();

  document.addEventListener('keydown', ({ key }) => keys.add(key));
  document.addEventListener('keyup', ({ key }) => keys.delete(key));

  return () => keys;
}

export function Control(): IControl {
  return { name: 'control', keys: new Set() };
}

export function ControlSystem(): ISystem {
  const getInputs = KeyBoard();

  return {
    filter: new Set(['control']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        const control = entity.get('control') as IControl;

        control.keys = getInputs();
      });
    },
  };
}
