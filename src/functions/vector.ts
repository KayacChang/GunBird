import { Vec2, Vec3 } from '../constants';
const { cos, sin, sqrt, max } = Math;

export function isVector2(arg: any): arg is Vec2 {
  return Array.isArray(arg) && arg.length === 2 && arg.every((n) => !Number.isNaN(n));
}

export function magnitude([x, y]: Vec2) {
  return sqrt(x ** 2 + y ** 2);
}

export function normalize([x, y]: Vec2): Vec2 {
  const len = max(1, magnitude([x, y]));

  return [x / len, y / len];
}

export function dir(radius: number): Vec2 {
  return [sin(radius), cos(radius)];
}

export function mul(v: Vec2, obj: Vec2): Vec2;
export function mul(v: Vec2, obj: number): Vec2;
export function mul(v: Vec2, obj: any): Vec2 {
  if (isVector2(obj)) {
    const [a1, a2] = v;
    const [b1, b2] = obj;
    return [a1 * b1, a2 * b2];
  }

  if (!Number.isNaN(obj)) {
    const [a1, a2] = v;
    return [a1 * obj, a2 * obj];
  }

  throw new Error(`Not support obj type`);
}

export function sub([x1, y1]: Vec2, [x2, y2]: Vec2): Vec2 {
  return [x1 - x2, y1 - y2];
}

export function cross([a1, a2, a3]: Vec3, [b1, b2, b3]: Vec3): Vec3 {
  return [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1];
}

export function rotate([x, y]: Vec2, radian: number): Vec2 {
  return [
    [cos(radian), -1 * sin(radian)],
    [sin(radian), cos(radian)],
  ].map(([a, b]) => x * a + y * b) as Vec2;
}
