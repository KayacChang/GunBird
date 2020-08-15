import Bullet from './bullet';
import ECS, { IEntity } from '@kayac/ecs.js';
import { ITransform } from '../../components';
import * as view from '../../views';

export function Pomme(entity: IEntity) {
  const speed = 10;

  const transform = ECS.component.get('transform', entity) as ITransform;

  function Shoot() {
    return [
      Bullet({
        position: transform.position,
        bulletView: view.Pomme(),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
    ];
  }

  return { shoot: Shoot };
}
