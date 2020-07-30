import { Vector2 } from '../constants';

interface Geometry {}

interface Circle extends Geometry {
  center: Vector2;
  radius: number;
}

interface Rect extends Geometry {
  point: Vector2;
  size: Vector2;
}

function isVector2(arg: any): arg is Vector2 {
  return Array.isArray(arg) && arg.length === 2;
}

function isCircle(arg: Geometry): arg is Circle {
  const test = arg as Circle;

  const testA = 'center' in test && isVector2(test.center);
  const testB = 'radius' in test && !Number.isNaN(test.radius);

  return testA && testB;
}

function isRect(arg: Geometry): arg is Rect {
  const test = arg as Rect;

  const testA = 'point' in test && isVector2(test.point);
  const testB = 'size' in test && isVector2(test.size);

  return testA && testB;
}

function hitTestCircle(a: Circle, b: Circle) {
  const [ax, ay] = a.center;
  const [bx, by] = b.center;
  const [dx, dy] = [ax - bx, ay - by];

  return Math.sqrt(dx * dx + dy * dy) < a.radius + b.radius;
}

function hitTestRectCircle(rect: Rect, c: Circle) {
  let [cx, cy] = c.center;
  let [rx, ry] = rect.point;
  let [rw, rh] = rect.size;

  const tx = cx < rx ? rx : cx > rx + rw ? rx + rw : cx;
  const ty = cy < ry ? ry : cy > ry + rh ? ry + rh : cy;

  const [dx, dy] = [cx - tx, cy - ty];

  return Math.sqrt(dx * dx + dy * dy) <= c.radius;
}

export default function hitTest(a: Geometry, b: Geometry) {
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
