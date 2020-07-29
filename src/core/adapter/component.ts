import { IEntity, IComponent } from '../ecs';
import { store } from '../state';
import { ACTION_TYPE } from '../state/types';

function add(component: IComponent, entity: IEntity) {
  store.dispatch({
    type: ACTION_TYPE.ADD_COMPONENT,
    payload: {
      entityID: entity.id,
      component,
    },
  });

  return entity.set(component.name, component);
}

function remove(component: IComponent, entity: IEntity) {
  return entity.delete(component.name);
}

export default {
  add,
  remove,
};
