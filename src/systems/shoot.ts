import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, IShoot, ISpeed } from '../components/types';
import { Movement } from '../components';

export function ShootSystem(): ISystem {
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

        const bullet = shoot.bullet();
        const bulletTransform = ECS.component.get('transform', bullet) as ITransform;
        bulletTransform.position = transform.position;

        const { value } = ECS.component.get('speed', bullet) as ISpeed;
        ECS.component.add(Movement([0, -1 * value * delta]), bullet);

        shoot.coldDown = shoot.fireRate;
      });
    },
  };
}
