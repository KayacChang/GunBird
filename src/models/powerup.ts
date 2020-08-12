import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Transform, Debug, Pickup } from '../components';
import { Circle, Vec2 } from '../constants';
import { Spritesheet, AnimatedSprite } from 'pixi.js';

export default function PowerUp(position: Vec2) {
  const texture = RES.get('spritesheet', 'POWER_UP') as Spritesheet;

  const view = new AnimatedSprite(texture.animations['powerup']);
  view.scale.set(2);
  view.updateAnchor = true;
  view.play();

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'pickup' }), entity);
  ECS.component.add(Transform({ position }), entity);
  ECS.component.add(Collider({ layer: 'pickup', shape: { position: [0, 0], radius: 20 } as Circle }), entity);
  ECS.component.add(Pickup('powerup'), entity);
  ECS.component.add(Debug(), entity);

  return entity;
}
