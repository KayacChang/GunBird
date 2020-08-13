import Missile from './missile';
import * as view from '../../views';

export function MagicStar() {
  function Level01() {
    return [
      Missile({
        view: view.MagicStar(),
        speed: 10,
        rotateSpeed: Math.PI / 2,
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  function Level02() {
    return [
      Missile({
        view: view.MagicStar(),
        speed: 10,
        rotateSpeed: Math.PI / 2,
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  return {
    Level01,
    Level02,
  };
}
