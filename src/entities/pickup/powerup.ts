import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Transform, Pickup } from '../../components';
import { Circle } from '../../constants';
import { DisplayObject } from 'pixi.js';
import { Vec2 } from '@kayac/vec2';

export function PowerUp(view: DisplayObject, position: Vec2) {
  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'pickup' }), entity);
  ECS.component.add(Transform({ position }), entity);
  ECS.component.add(Collider({ layer: 'pickup', shape: { position: [0, 0], radius: 20 } as Circle }), entity);
  ECS.component.add(Pickup('powerup'), entity);
  return entity;
}
