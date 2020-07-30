import { Vector2 } from '../constants';
import { IEntity, ISystem, IComponent } from '../ecs';
import { IControl, ITransform } from './types';

interface IShoot extends IComponent {
  fireRate: number;
  coldDown: number;
  bullet: () => IEntity;
}
type Props = {
  bullet: () => IEntity;
};
export function Shoot({ bullet }: Props): IShoot {
  return { name: 'shoot', fireRate: 16, coldDown: 0, bullet };
}

export function ShootSystem(): ISystem {
  return {
    filter: new Set(['control', 'transform', 'shoot']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        const { keys } = entity.get('control') as IControl;
        const shoot = entity.get('shoot') as IShoot;

        shoot.coldDown = Math.max(0, shoot.coldDown - delta);

        if (!keys.has(' ') || shoot.coldDown > 0) {
          return;
        }

        console.log('shoot');
        shoot.coldDown = shoot.fireRate;

        const transform = entity.get('transform') as ITransform;

        const bullet = shoot.bullet();
        const bulletTransform = bullet.get('transform') as ITransform;
        bulletTransform.position = transform.position;

        console.log(transform.position);
      });
    },
  };
}
