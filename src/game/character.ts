import { Spritesheet, AnimatedSprite, Container } from 'pixi.js';
import RES from '../resources';
import { Renderer, Transform, Control, Movement, Shoot } from '../systems';
import ECS from '../ecs';
import Bullet from './bullet';

export default function Character() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['marion']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  it.addChild(sprite);

  const entity = ECS.entity.create('marion');
  ECS.component.add(Renderer(it), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Control(), entity);
  ECS.component.add(Movement(), entity);
  ECS.component.add(Shoot({ bullet: Bullet }), entity);

  return entity;
}
