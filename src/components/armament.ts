import { IArmament } from './types';
import { IEntity } from '@kayac/ecs.js';

interface Weapon {
  coldDown?: number;
  fireRate: number;
  fire: () => IEntity[];
}

export function Armament(_arms: Weapon[][]): IArmament {
  const arms = _arms.map((weapons) =>
    //
    weapons.map((weapon) => ({ coldDown: 0, ...weapon }))
  );

  return { id: 'armament', fire: false, level: 0, arms };
}
