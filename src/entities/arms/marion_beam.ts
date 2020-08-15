import { mul, dir, rotate } from '@kayac/vec2';
import Bullet from './bullet';
import * as view from '../../views';
import ECS, { IEntity } from '@kayac/ecs.js';
import { ITransform } from '../../components';

export function MarionBeam(entity: IEntity) {
  const speed = 60;

  const transform = ECS.component.get('transform', entity) as ITransform;

  function Level01() {
    return [
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('M1'),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
    ];
  }

  function Level02() {
    return [
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('M2'),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
    ];
  }

  function Level03() {
    return [
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('L1'),
        impactView: view.Impact(),
        velocity: rotate([0, -1 * speed], (-1 * Math.PI) / 12),
        shape: { radius: 10, position: [-2, 5] },
      }),
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('M1'),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('R1'),
        impactView: view.Impact(),
        velocity: rotate([0, -1 * speed], Math.PI / 12),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  function Level04() {
    return [
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('L2'),
        impactView: view.Impact(),
        velocity: rotate([0, -1 * speed], (-1 * Math.PI) / 12),
        shape: { radius: 10, position: [-2, 5] },
      }),
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('M2'),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
      Bullet({
        position: transform.position,
        bulletView: view.MarionBeam('R2'),
        impactView: view.Impact(),
        velocity: rotate([0, -1 * speed], Math.PI / 12),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  return {
    Level01,
    Level02,
    Level03,
    Level04,
  };
}
