import { Spritesheet, AnimatedSprite } from 'pixi.js';
import RES from '../resources';
import { Renderer, Transform, Control, Movement } from '../systems';
import ECS from '../ecs';

export default function Character() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new AnimatedSprite(texture.animations['marion']);
  it.scale.set(2);
  it.updateAnchor = true;
  it.animationSpeed = 0.2;
  it.play();

  const entity = ECS.entity.create('marion');
  ECS.component.add(Renderer(it), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Control(), entity);
  ECS.component.add(Movement(), entity);

  return entity;
}
