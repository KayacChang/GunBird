import RES from '../../resources';
import { Spritesheet, Container, AnimatedSprite } from 'pixi.js';

export function Character() {
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

export function Bullet() {
  const texture = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['bullet']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  // offset
  sprite.position.y = -40;

  it.addChild(sprite);

  return it;
}

export function Impact() {
  const texture = RES.get('spritesheet', 'BULLET_IMPACT') as Spritesheet;

  const it = new AnimatedSprite(texture.animations['impact']);
  it.scale.set(1.5);
  it.updateAnchor = true;
  it.loop = false;
  it.play();

  return it;
}
