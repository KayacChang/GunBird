import { Geometry, Circle } from '../constants';
import { isCircle } from './geometry';

function hitTestCircle(a: Circle, b: Circle) {
  const [ax, ay] = a.position;
  const [bx, by] = b.position;
  const [dx, dy] = [ax - bx, ay - by];

  return Math.sqrt(dx * dx + dy * dy) < a.radius + b.radius;
}

export function hitTest(a: Geometry, b: Geometry) {
  //
  if (isCircle(a) && isCircle(b)) {
    return hitTestCircle(a, b);
  }

  return false;
}
