import { IShoot } from './types';
import { IEntity } from '@kayac/ecs.js';

type Props = {
  fireRate: number;
  bullet: () => IEntity;
};

export function Shoot({ fireRate, bullet }: Props): IShoot {
  return { id: 'shoot', fireRate, coldDown: 0, fire: false, bullet };
}
