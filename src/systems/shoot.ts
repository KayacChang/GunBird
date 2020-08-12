import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, IShoot } from '../components/types';
import { AreaListener } from '../components';
import { Application } from 'pixi.js';

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

        const bullets = shoot.bullet();
        bullets.forEach((bullet) => {
          ECS.component.add(
            AreaListener({
              rect: { position: [0, 0], size: [app.screen.width, app.screen.height] },
              onLeave: () => ECS.entity.remove(bullet),
            }),
            bullet
          );

          const bulletTransform = ECS.component.get('transform', bullet) as ITransform;
          bulletTransform.position = transform.position;
        });

        shoot.coldDown = shoot.fireRate;
      });
    },
  };
}
