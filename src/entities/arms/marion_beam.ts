import { mul, dir } from '../../functions';
import Bullet from './bullet';
import * as view from '../../views';

export function MarionBeam() {
  const speed = 60;

  function Level01() {
    return [
      Bullet({
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
        bulletView: view.MarionBeam('L1'),
        impactView: view.Impact(),
        velocity: mul(dir(Math.PI / 12), [-1 * speed, -1 * speed]),
        shape: { radius: 10, position: [-2, 5] },
      }),
      Bullet({
        bulletView: view.MarionBeam('M1'),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
      Bullet({
        bulletView: view.MarionBeam('R1'),
        impactView: view.Impact(),
        velocity: mul(dir(Math.PI / 12), [1 * speed, -1 * speed]),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  function Level04() {
    return [
      Bullet({
        bulletView: view.MarionBeam('L2'),
        impactView: view.Impact(),
        velocity: mul(dir(Math.PI / 12), [-1 * speed, -1 * speed]),
        shape: { radius: 10, position: [-2, 5] },
      }),
      Bullet({
        bulletView: view.MarionBeam('M2'),
        impactView: view.Impact(),
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
      Bullet({
        bulletView: view.MarionBeam('R2'),
        impactView: view.Impact(),
        velocity: mul(dir(Math.PI / 12), [1 * speed, -1 * speed]),
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
