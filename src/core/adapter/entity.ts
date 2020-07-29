import ecs from '../ecs';
import { store } from '../state';
import { ACTION_TYPE } from '../state/types';

function create(id: string) {
  const entity = ecs.entity.create(id);

  store.dispatch({
    type: ACTION_TYPE.ADD_ENTITY,
    payload: id,
  });

  return entity;
}

export default {
  create,
};
