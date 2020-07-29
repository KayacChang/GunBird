import ecs from '../ecs';
import { store } from '../state';
import { ACTION_TYPE } from '../state/types';
import { ISystem } from '../ecs';

function add(name: string, system: ISystem) {
  ecs.system.add(system);

  store.dispatch({
    type: ACTION_TYPE.ADD_SYSTEM,
    payload: { name: name, filter: Array.from(system.filter) },
  });
}

export default {
  add,
};
