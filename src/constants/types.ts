import { Vec2 } from '@kayac/vec2';

export type Pair = [number, number];

export interface Size {
  width: number;
  height: number;
}

export interface Geometry {
  position: Vec2;
}

export interface Circle extends Geometry {
  radius: number;
}

export interface Rect extends Geometry {
  size: Vec2;
}
