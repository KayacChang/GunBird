import { Component, Entity } from './types';

function add(componet: Component, entity: Entity) {
  return entity.components.set(componet.name, componet);
}

function remove(component: Component, entity: Entity) {
  return entity.components.delete(component.name);
}

export default function ComponentManager() {
  return {
    add,
    remove,
  };
}
