import { Application, Container, AnimatedSprite } from 'pixi.js';
import { Renderer, Control, Speed, Collider, Transform, Boundary, Shoot, IPickup } from '../components';
import ECS from '@kayac/ecs.js';
import { Circle } from '../constants';

type Props = {
  character: Container;
  bullet: () => Container;
  impact: () => AnimatedSprite;
};

export default function Character(app: Application, { character, bullet, impact }: Props) {
  const entity = ECS.entity.create('marion');
  ECS.component.add(Renderer({ view: character, layer: 'player' }), entity);
  ECS.component.add(Control(), entity);
  ECS.component.add(Speed(5), entity);
  ECS.component.add(
    Collider({
      layer: 'player',
      masks: ['pickup'],
      shape: { radius: 10, position: [0, 0] } as Circle,
      onEnter(colliding) {
        //
        colliding.forEach((entity) => {
          const pickup = ECS.component.get('pickup', entity) as IPickup;
          if (pickup && pickup.type === 'powerup') {
            console.log('power up');

            ECS.entity.remove(entity);
          }
        });
      },
    }),
    entity
  );
  ECS.component.add(Shoot({ fireRate: 8, bullet, impact }), entity);
  ECS.component.add(Transform({ position: [app.screen.width / 2, app.screen.height / 2] }), entity);
  ECS.component.add(
    Boundary({
      position: [app.screen.x, app.screen.y],
      size: [app.screen.width, app.screen.height],
    }),
    entity
  );
  // ECS.component.add(Debug(), entity);

  return entity;
}
