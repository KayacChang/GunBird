import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, IShoot, ISpeed } from '../components/types';
import { Movement } from '../components';

export function ShootSystem(): ISystem {
  return {
    id: ShootSystem.name,

    filter: new Set(['transform', 'shoot']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        const shoot = entity.get('shoot') as IShoot;

        shoot.coldDown = Math.max(0, shoot.coldDown - delta);

        if (shoot.coldDown > 0 || !shoot.fire) {
          return;
        }

        const transform = entity.get('transform') as ITransform;

        const bullet = shoot.bullet();
        const bulletTransform = bullet.get('transform') as ITransform;
        bulletTransform.position = transform.position;

        const { value } = bullet.get('speed') as ISpeed;
        ECS.component.add(Movement([0, -1 * value * delta]), bullet);

        shoot.coldDown = shoot.fireRate;
      });
    },
  };
}
