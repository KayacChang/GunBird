import { IShoot } from './types';
import { Container, AnimatedSprite } from 'pixi.js';

type Props = {
  fireRate: number;
  bullet: () => Container;
  impact: () => AnimatedSprite;
};

export function Shoot({ fireRate, bullet, impact }: Props): IShoot {
  return { id: 'shoot', fireRate, coldDown: 0, fire: false, bullet, impact };
}
