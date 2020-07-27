import { Spritesheet, AnimatedSprite } from 'pixi.js';
import RES from '../resources';

export default function Character() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new AnimatedSprite(texture.animations['marion']);
  it.scale.set(2);
  it.updateAnchor = true;
  it.animationSpeed = 0.2;
  it.play();

  return it;
}
