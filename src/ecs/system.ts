import { System } from './types';

export default function SystemManager() {
  const systems: Set<System> = new Set();

  return {
    get() {
      return systems;
    },

    add(system: System) {
      return systems.add(system);
    },

    remove(system: System) {
      return systems.delete(system);
    },
  };
}
