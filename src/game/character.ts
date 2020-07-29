import { Spritesheet, AnimatedSprite } from 'pixi.js';
import RES from '../resources';
import { Renderer, Transform, Control, Movement } from '../systems';
import { Entity } from '../core';

export default function Character() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new AnimatedSprite(texture.animations['marion']);
  it.scale.set(2);
  it.updateAnchor = true;
  it.animationSpeed = 0.2;
  it.play();

  const entity = Entity('marion');
  entity.addComponent(Renderer(it));
  entity.addComponent(Transform({}));
  entity.addComponent(Control());
  entity.addComponent(Movement());

  return entity;
}
