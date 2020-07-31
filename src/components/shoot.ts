import { IEntity } from '@kayac/ecs.js';
import { IShoot } from './types';

type Props = {
  fireRate: number;
  bullet: () => IEntity;
};

export function Shoot({ fireRate, bullet }: Props): IShoot {
  return { id: 'shoot', fireRate, coldDown: 0, fire: false, bullet };
}
