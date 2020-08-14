import Missile from './missile';
import * as view from '../../views';
import ECS, { IEntity } from '@kayac/ecs.js';
import { ITransform } from '../../components';
import { add, rotate, mul } from '../../functions';

export function MagicStar(entity: IEntity) {
  const transform = ECS.component.get('transform', entity) as ITransform;

  function Level01() {
    return [
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (-1 * Math.PI) / 3)),
        view: view.MagicStar(),
        force: rotate([0, -1], (-1 * Math.PI) / 4),
        shape: { radius: 15, position: [0, 0] },
      }),
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (1 * Math.PI) / 3)),
        view: view.MagicStar(),
        force: rotate([0, -1], (1 * Math.PI) / 4),
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  function Level02() {
    return [
      //
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (-1 * Math.PI) / 6)),
        view: view.MagicStar(),
        force: rotate([0, -1], (-1 * Math.PI) / 6),
        shape: { radius: 15, position: [0, 0] },
      }),
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (1 * Math.PI) / 6)),
        view: view.MagicStar(),
        force: rotate([0, -1], (1 * Math.PI) / 6),
        shape: { radius: 15, position: [0, 0] },
      }),
      //
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (-1 * Math.PI) / 3)),
        view: view.MagicStar(),
        force: rotate([0, -1], (-1 * Math.PI) / 4),
        shape: { radius: 15, position: [0, 0] },
      }),
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (1 * Math.PI) / 3)),
        view: view.MagicStar(),
        force: rotate([0, -1], (1 * Math.PI) / 4),
        shape: { radius: 15, position: [0, 0] },
      }),
      //
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (-1 * Math.PI) / 2)),
        view: view.MagicStar(),
        force: rotate([0, -1], (-1 * Math.PI) / 3),
        shape: { radius: 15, position: [0, 0] },
      }),
      Missile({
        position: add(transform.position, rotate(mul([0, -1], 45), (1 * Math.PI) / 2)),
        view: view.MagicStar(),
        force: rotate([0, -1], (1 * Math.PI) / 3),
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  return {
    Level01,
    Level02,
  };
}
