import { Spritesheet, AnimatedSprite } from 'pixi.js';
import RES from '../resources';
import { Renderer, Transform, Control, Movement } from '../systems';
import { ecs } from '../core';

export default function Character() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new AnimatedSprite(texture.animations['marion']);
  it.scale.set(2);
  it.updateAnchor = true;
  it.animationSpeed = 0.2;
  it.play();

  const entity = ecs.entity.create('marion');
  ecs.component.add(Renderer(it), entity);
  ecs.component.add(Transform({}), entity);
  ecs.component.add(Control(), entity);
  ecs.component.add(Movement(), entity);

  return entity;
}
