import RES from '../resources';
import { AnimatedSprite, Spritesheet } from 'pixi.js';

export default function Impact() {
  const texture = RES.get('spritesheet', 'BULLET_IMPACT') as Spritesheet;

  const view = new AnimatedSprite(texture.animations['impact']);
  view.scale.set(1.5);
  view.updateAnchor = true;
  view.loop = false;

  return view;
}
