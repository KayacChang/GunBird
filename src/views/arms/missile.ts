import RES from '../../resources';
import { Texture, Sprite } from 'pixi.js';

export function MagicStar() {
  const texture = RES.get('texture', 'MARION_MISSILE') as Texture;

  const missile = new Sprite(texture);
  missile.anchor.set(0.5);
  missile.scale.set(2);

  return missile;
}
