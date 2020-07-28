import { Vector2 } from '../constants';

export function magnitude([x, y]: Vector2) {
  return Math.sqrt(x ** 2 + y ** 2);
}

export function normalize([x, y]: Vector2) {
  const len = Math.max(1, magnitude([x, y]));

  return [x / len, y / len];
}
