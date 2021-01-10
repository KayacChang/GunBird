import { Renderer, Control, Speed, Collider, Transform, Boundary, IPickup, IArmament } from '../../components';
import ECS from '@kayac/ecs.js';
import { Application, DisplayObject } from 'pixi.js';
import { Circle } from '../../constants';
import { clamp } from '../../functions';

export default function Character(app: Application, view: DisplayObject) {
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view, layer: 'player' }), entity);
  ECS.component.add(Control(), entity);
  ECS.component.add(Speed(5), entity);
  ECS.component.add(
    Collider({
      layer: 'player',
      masks: ['pickup'],
      shape: { radius: 10, position: [0, 0] } as Circle,
      onEnter: (colliding) => {
        //
        colliding.forEach((collide) => {
          const pickup = ECS.component.get('pickup', collide) as IPickup;
          if (pickup && pickup.type === 'powerup') {
            const armament = ECS.component.get('armament', entity) as IArmament;
            armament.level = clamp(armament.level + 1, 0, 4);

            ECS.entity.remove(collide);
          }
        });
      },
    }),
    entity
  );

  ECS.component.add(Transform({ position: [app.screen.width / 2, app.screen.height / 2] }), entity);
  ECS.component.add(
    Boundary({
      position: [app.screen.x, app.screen.y],
      size: [app.screen.width, app.screen.height],
    }),
    entity
  );

  return entity;
}
