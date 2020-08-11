import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, IShoot, ISpeed } from '../components/types';
import { Renderer, Transform, Speed, Collider, Movement, AreaListener } from '../components';
import { AnimatedSprite, Application } from 'pixi.js';
import { Circle, Vec2 } from '../constants';

function Impact(view: AnimatedSprite, position: Vec2) {
  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'effect' }), entity);
  ECS.component.add(Transform({ position }), entity);
  view.onComplete = () => ECS.entity.remove(entity);

  return entity;
}

function Bullet({ bullet, impact }: IShoot) {
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view: bullet(), layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Speed(60), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape: { radius: 10, position: [0, -30] } as Circle,
      onEnter: () => {
        const { position } = ECS.component.get('transform', entity) as ITransform;
        Impact(impact(), position);

        ECS.entity.remove(entity);
      },
    }),
    entity
  );
  // ECS.component.add(Debug(), entity);

  return entity;
}

export function ShootSystem(app: Application): ISystem {
  return {
    id: ShootSystem.name,

    filter: ['transform', 'shoot'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const shoot = ECS.component.get('shoot', entity) as IShoot;

        shoot.coldDown = Math.max(0, shoot.coldDown - delta);
        if (shoot.coldDown > 0 || !shoot.fire) {
          return;
        }

        const transform = ECS.component.get('transform', entity) as ITransform;

        const bullet = Bullet(shoot);
        ECS.component.add(
          AreaListener({
            rect: { position: [0, 0], size: [app.screen.width, app.screen.height] },
            onLeave: () => ECS.entity.remove(bullet),
          }),
          bullet
        );

        const bulletTransform = ECS.component.get('transform', bullet) as ITransform;
        bulletTransform.position = transform.position;

        const { value } = ECS.component.get('speed', bullet) as ISpeed;
        ECS.component.add(Movement([0, -1 * value * delta]), bullet);

        shoot.coldDown = shoot.fireRate;
      });
    },
  };
}
