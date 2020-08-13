import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Status, IStatus, Transform } from '../../components';
import { Circle } from '../../constants';
import { Container } from 'pixi.js';
import { PowerUp } from '..';
import { PowerUp as PowerUpView } from '../../views';

type Props = {
  enemyView: Container;
  life: number;
};

export default function Enemy({ enemyView, life }: Props) {
  const entity = ECS.entity.create();

  ECS.component.add(
    Status({
      life,
      onLifeChange: async (current, previous) => {
        if (previous > current) {
          enemyView.emit('hit');
        }

        if (current <= 0) {
          enemyView.emit('dead');

          PowerUp(PowerUpView(), [enemyView.position.x, enemyView.position.y]);

          ECS.entity.remove(entity);
        }
      },
    }),
    entity
  );

  ECS.component.add(Renderer({ view: enemyView, layer: 'enemy' }), entity);

  ECS.component.add(Transform({}), entity);

  ECS.component.add(
    Collider({
      layer: 'enemy',
      masks: ['bullet'],
      shape: { position: [0, -10], radius: enemyView.width / 2 } as Circle,
      onEnter: () => {
        const status = ECS.component.get('status', entity) as IStatus;
        status.life -= 1;
      },
    }),
    entity
  );

  return entity;
}
