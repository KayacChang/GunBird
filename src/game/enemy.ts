import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Status, IStatus, Transform, Debug, Pickup } from '../components';
import { Circle, Vec2 } from '../constants';
import { Container, Spritesheet, AnimatedSprite } from 'pixi.js';

function PowerUp(position: Vec2) {
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

export default function Enemy<T extends Container>(view: T) {
  const entity = ECS.entity.create();

  ECS.component.add(
    Status({
      life: 17,
      onLifeChange: async (current, previous) => {
        if (previous > current) {
          view.emit('hit');
        }

        if (current <= 0) {
          view.emit('dead');

          PowerUp([view.position.x, view.position.y]);

          ECS.entity.remove(entity);
        }
      },
    }),
    entity
  );

  ECS.component.add(
    Renderer({
      view,
      layer: 'enemy',
    }),
    entity
  );

  ECS.component.add(Transform({}), entity);

  ECS.component.add(
    Collider({
      layer: 'enemy',
      masks: ['bullet'],
      shape: { position: [0, -10], radius: view.width / 2 } as Circle,
      onEnter: () => {
        const status = ECS.component.get('status', entity) as IStatus;
        status.life -= 1;
      },
    }),
    entity
  );

  // ECS.component.add(Debug(), entity);

  return entity;
}
