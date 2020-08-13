import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, IArmament } from '../components/types';
import { AreaListener } from '../components';
import { Application } from 'pixi.js';

export function ArmamentSystem(app: Application): ISystem {
  return {
    id: ArmamentSystem.name,

    filter: ['armament', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { level, arms, fire } = ECS.component.get('armament', entity) as IArmament;

        const transform = ECS.component.get('transform', entity) as ITransform;

        function init(bullet: IEntity) {
          ECS.component.add(
            AreaListener({
              rect: { position: [0, 0], size: [app.screen.width, app.screen.height] },
              onLeave: () => ECS.entity.remove(bullet),
            }),
            bullet
          );

          const bulletTransform = ECS.component.get('transform', bullet) as ITransform;
          bulletTransform.position = transform.position;
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
