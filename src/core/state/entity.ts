import { ACTION_TYPE, EntityAction, Entity } from './types';

const initialState: Entity[] = [];

export function EntitiesReducer(state = initialState, action: EntityAction) {
  if (action.type === ACTION_TYPE.ADD_ENTITY) {
    const id = action.payload as string;

    return [...state, { id }];
  }

  if (action.type === ACTION_TYPE.ADD_COMPONENT) {
    const { component, entityID } = action.payload;

    return state.map((origin) => {
      return origin.id === entityID ? { ...origin, [component.name]: component } : origin;
    });
  }

  return state;
}
