import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Status, IStatus, Transform } from '../components';
import { Circle } from '../constants';
import { Container } from 'pixi.js';
import PowerUp from './powerup';

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

  ECS.component.add(Renderer({ view, layer: 'enemy' }), entity);

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
