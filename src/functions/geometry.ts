import { Rect, Geometry, Circle } from '../constants';
import { isVector2 } from './vector';

export function isCircle(arg: Geometry): arg is Circle {
  const test = arg as Circle;

  const testA = 'c' in test && isVector2(test.c);
  const testB = 'r' in test && !Number.isNaN(test.r);

  return testA && testB;
}

export function isRect(arg: Geometry): arg is Rect {
  const test = arg as Rect;

  const testA = 'x' in test && !Number.isNaN(test.x);
  const testB = 'y' in test && !Number.isNaN(test.y);
  const testC = 'w' in test && !Number.isNaN(test.w);
  const testD = 'h' in test && !Number.isNaN(test.h);

  return testA && testB && testC && testD;
}
