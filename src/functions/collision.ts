import { Geometry, Circle, Rect } from '../constants';
import { isCircle, isRect } from './geometry';

function hitTestCircle(a: Circle, b: Circle) {
  const [ax, ay] = a.c;
  const [bx, by] = b.c;
  const [dx, dy] = [ax - bx, ay - by];

  return Math.sqrt(dx * dx + dy * dy) < a.r + b.r;
}

function hitTestRectCircle(a: Rect, b: Circle) {
  const [cx, cy] = b.c;
  const { x: rx, y: ry, w: rw, h: rh } = a;

  const tx = cx < rx ? rx : cx > rx + rw ? rx + rw : cx;
  const ty = cy < ry ? ry : cy > ry + rh ? ry + rh : cy;

  const [dx, dy] = [cx - tx, cy - ty];

  return Math.sqrt(dx * dx + dy * dy) <= b.r;
}

export function hitTest(a: Geometry, b: Geometry) {
  //
  if (isCircle(a) && isCircle(b)) {
    return hitTestCircle(a, b);
  }

  if (isRect(a) && isCircle(b)) {
    return hitTestRectCircle(a, b);
  }

  if (isCircle(a) && isRect(b)) {
    return hitTestRectCircle(b, a);
  }

  return false;
}
