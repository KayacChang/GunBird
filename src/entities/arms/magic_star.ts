import Missile from './missile';
import * as view from '../../views';
import ECS, { IEntity } from '@kayac/ecs.js';
import { ITransform } from '../../components';
import { add } from '../../functions';

export function MagicStar(entity: IEntity) {
  const transform = ECS.component.get('transform', entity) as ITransform;

  function Level01() {
    return [
      Missile({
        position: add(transform.position, [-22, 0]),
        view: view.MagicStar(),
        force: [-0.5, -0.5],
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  function Level02() {
    return [
      Missile({
        position: transform.position,
        view: view.MagicStar(),
        force: [0, 1],
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  return {
    Level01,
    Level02,
  };
}
