import { Entity, Component } from './types';

export default function EntityManager() {
  const entities: Set<Entity> = new Set();

  return {
    create(): Entity {
      const entity = {
        components: new Map<string, Component>(),
      };

      entities.add(entity);

      return entity;
    },

    get() {
      return entities;
    },
  };
}
