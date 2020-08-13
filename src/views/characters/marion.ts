import RES from '../../resources';
import { Spritesheet, Container, AnimatedSprite } from 'pixi.js';

export function Marion() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const marion = new Container();

  const sprite = new AnimatedSprite(texture.animations['marion']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  marion.addChild(sprite);

  return marion;
}
