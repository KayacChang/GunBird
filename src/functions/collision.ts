import { Vector2 } from '../constants';

interface Geometry {}

interface Circle extends Geometry {
  c: Vector2;
  r: number;
}

interface Rect extends Geometry {
  x: number;
  y: number;
  w: number;
  h: number;
}

function isVector2(arg: any): arg is Vector2 {
  return Array.isArray(arg) && arg.length === 2;
}

function isCircle(arg: Geometry): arg is Circle {
  const test = arg as Circle;

  const testA = 'c' in test && isVector2(test.c);
  const testB = 'r' in test && !Number.isNaN(test.r);

  return testA && testB;
}

function isRect(arg: Geometry): arg is Rect {
  const test = arg as Rect;

  const testA = 'x' in test && !Number.isNaN(test.x);
  const testB = 'y' in test && !Number.isNaN(test.y);
  const testC = 'w' in test && !Number.isNaN(test.w);
  const testD = 'h' in test && !Number.isNaN(test.h);

  return testA && testB && testC && testD;
}

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
