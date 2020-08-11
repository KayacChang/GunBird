import { IShoot } from './types';
import { IEntity } from '@kayac/ecs.js';

type Props = {
  fireRate: number;
  army: (level: number) => () => IEntity[];
};

export function Shoot({ fireRate, army }: Props): IShoot {
  return {
    id: 'shoot',
    fireRate,
    coldDown: 0,
    fire: false,
    level: 0,
    bullet() {
      return army(this.level)();
    },
  };
}
