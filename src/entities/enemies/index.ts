import Enemy from './enemy';
import * as view from '../../views';

export function Trump_Airship() {
  return Enemy({
    life: 19,
    enemyView: view.Trump_Airship(),
  });
}
