export type Pair = [number, number];

export interface Size {
  width: number;
  height: number;
}

export type Vector2 = Pair;

export interface Geometry {}

export interface Circle extends Geometry {
  c: Vector2;
  r: number;
}

export interface Rect extends Geometry {
  x: number;
  y: number;
  w: number;
  h: number;
}
