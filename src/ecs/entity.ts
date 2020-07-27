import { Entity, Component } from './types';

export default function EntityManager() {
  const entities: Set<Entity> = new Set();

  return {
    create(): Entity {
      return {
        components: new Map<string, Component>(),
      };
    },

    get() {
      return entities;
    },

    add(entity: Entity) {
      return entities.add(entity);
    },
  };
}
