import { ACTION_TYPE, System, SystemAction } from './types';

const initialState: System[] = [];

export function SystemReducer(state = initialState, action: SystemAction) {
  if (action.type === ACTION_TYPE.ADD_SYSTEM) {
    const system = action.payload as System;

    return [...state, system];
  }

  return state;
}
