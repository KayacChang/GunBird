import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { IArmament } from '../components/types';
import { AreaListener } from '../components';
import { Application } from 'pixi.js';

export function ArmamentSystem(app: Application): ISystem {
  return {
    id: ArmamentSystem.name,

    filter: ['armament'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { level, arms, fire } = ECS.component.get('armament', entity) as IArmament;

        function init(bullet: IEntity) {
          ECS.component.add(
            AreaListener({
              rect: { position: [0, 0], size: [app.screen.width, app.screen.height] },
              onLeave: () => ECS.entity.remove(bullet),
            }),
            bullet
          );
        }

        arms[level].forEach((weapon) => {
          weapon.coldDown -= delta;

          if (weapon.coldDown > 0 || !fire) {
            return;
          }

          weapon.fire().forEach(init);

          weapon.coldDown = weapon.fireRate;
        });
      });
    },
  };
}
