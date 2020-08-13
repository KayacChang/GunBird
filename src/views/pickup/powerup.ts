import RES from '../../resources';
import { Spritesheet, AnimatedSprite } from 'pixi.js';

export function PowerUp() {
  const texture = RES.get('spritesheet', 'POWER_UP') as Spritesheet;

  const view = new AnimatedSprite(texture.animations['powerup']);
  view.scale.set(2);
  view.updateAnchor = true;
  view.play();

  return view;
}
