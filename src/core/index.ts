import ecs, { IComponent, ISystem } from './ecs';
import { store } from './state';
import { ACTION_TYPE, System } from './state/types';

export function Entity(id: string) {
  const entity = ecs.entity.create();

  store.dispatch({
    type: ACTION_TYPE.ADD_ENTITY,
    payload: id,
  });

  return {
    addComponent(component: IComponent) {
      ecs.component.add(component, entity);

      store.dispatch({
        type: ACTION_TYPE.ADD_COMPONENT,
        payload: {
          entityID: id,
          component,
        },
      });
    },

    getComponent(name: string) {
      return entity.get(name);
    },
  };
}

export function addSystem(system: ISystem & System) {
  ecs.system.add(system);

  store.dispatch({
    type: ACTION_TYPE.ADD_SYSTEM,
    payload: { name: system.name, filter: Array.from(system.filter) },
  });
}

export * from './ecs/types';
