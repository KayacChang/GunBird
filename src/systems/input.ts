import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { IControl } from '../components';
import { ACTION } from '../constants';

function KeyBoard(config: Record<string, string>) {
  const actions = new Set<string>();

  document.addEventListener('keydown', ({ key }) => actions.add(key));
  document.addEventListener('keyup', ({ key }) => actions.delete(key));

  return () => Array.from(actions);
}

export function InputSystem(): ISystem {
  const getInputs = KeyBoard(ACTION);

  let cache: string[] = [];

  return {
    id: InputSystem.name,

    filter: ['control'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const actions = getInputs();

        const pressed = actions.filter((action) => cache.includes(action));
        const released = cache.filter((action) => !actions.includes(action));

        const control = ECS.component.get('control', entity) as IControl;
        control.released = released;
        control.pressed = pressed;

        cache = actions;
      });
    },
  };
}
