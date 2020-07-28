import EntityManager from './entity';
import ComponentManager from './component';
import SystemManager from './system';
import { Entity } from './types';

const entity = EntityManager();
const component = ComponentManager();
const system = SystemManager();

function getEntitiesByComponentNames(names: string[], entities: Entity[]) {
  return entities.filter((entity) => names.every((name) => entity.has(name)));
}

function update(delta: number) {
  const entities = Array.from(entity.get());

  Array.from(system.get()).forEach(({ filter, update }) =>
    update(delta, getEntitiesByComponentNames(filter, entities))
  );
}

export default {
  entity,
  component,
  system,
  update,
};

export * from './types';
