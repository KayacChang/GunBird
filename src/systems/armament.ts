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
        const armament = ECS.component.get('armament', entity) as IArmament;
        let { level, arms, fire, charged, hasCharged } = armament;

        function init(bullet: IEntity) {
          ECS.component.add(
            AreaListener({
              rect: { position: [0, 0], size: [app.screen.width, app.screen.height] },
              onLeave: () => ECS.entity.remove(bullet),
            }),
            bullet
          );
        }

        if (!fire) {
          arms[level].forEach((weapon) => (weapon.coldDown -= delta));
          return;
        }

        if (hasCharged >= charged.chargedTime) {
          charged.fire().forEach(init);

          armament.hasCharged = 0;

          return;
        }

        arms[level].forEach((weapon) => {
          if (weapon.coldDown > 0) {
            return;
          }

          weapon.fire().forEach(init);

          weapon.coldDown = weapon.fireRate;
        });

        armament.hasCharged = 0;
      });
    },
  };
}
