export interface Component {
  name: string;
  [index: string]: any;
}

export interface Entity {
  id: string;
  [index: string]: any;
}

export interface System {
  name: string;
}

export enum ACTION_TYPE {
  ADD_ENTITY = 'ADD_ENTITY',
  ADD_COMPONENT = 'ADD_COMPONENT',
  ADD_SYSTEM = 'ADD_SYSTEM',
}

export interface AddEntityAction {
  type: typeof ACTION_TYPE.ADD_ENTITY;
  payload: string;
}

export interface AddComponentAction {
  type: typeof ACTION_TYPE.ADD_COMPONENT;
  payload: {
    entityID: string;
    component: Component;
  };
}

export interface AddSystemAction {
  type: typeof ACTION_TYPE.ADD_SYSTEM;
  payload: System;
}

export type EntityAction = AddEntityAction | AddComponentAction;
export type SystemAction = AddSystemAction;
