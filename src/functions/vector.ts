import { Vec2 } from '../constants';

export function isVector2(arg: any): arg is Vec2 {
  return Array.isArray(arg) && arg.length === 2 && arg.every((n) => !Number.isNaN(n));
}

export function magnitude([x, y]: Vec2) {
  return Math.sqrt(x ** 2 + y ** 2);
}

export function normalize([x, y]: Vec2) {
  const len = Math.max(1, magnitude([x, y]));

  return [x / len, y / len];
}
