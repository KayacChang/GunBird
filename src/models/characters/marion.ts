import RES from '../../resources';
import { Spritesheet, Container, AnimatedSprite } from 'pixi.js';

export default function Marion() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['marion']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  it.addChild(sprite);

  return it;
}
