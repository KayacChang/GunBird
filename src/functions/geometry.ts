import { Rect, Geometry, Circle } from '../constants';
import { isVector2 } from './vector';

export function isCircle(arg: Geometry): arg is Circle {
  const test = arg as Circle;

  return Boolean(test.radius && !Number.isNaN(test.radius));
}

export function isRect(arg: Geometry): arg is Rect {
  const test = arg as Rect;

  return test.size && isVector2(test.size);
}
