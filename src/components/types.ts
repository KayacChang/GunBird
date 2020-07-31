import { IComponent, IEntity } from '@kayac/ecs.js';
import { DisplayObject } from 'pixi.js';
import { Vector2, Rect, Geometry } from '../constants';

export interface IRenderer extends IComponent {
  id: 'renderer';
  view: DisplayObject;
  layer: string;
}

export interface ITransform extends IComponent {
  id: 'transform';
  position: Vector2;
}

export interface IControl extends IComponent {
  id: 'control';
}

export interface IMovement extends IComponent {
  id: 'movement';
  vector: Vector2;
}

export interface ISpeed extends IComponent {
  id: 'speed';
  value: number;
}

export interface IShoot extends IComponent {
  fireRate: number;
  coldDown: number;
  fire: boolean;
  bullet: () => IEntity;
}

export interface IBoundary extends IComponent {
  id: 'boundary';
  rect: Rect;
}

export interface ICollider extends IComponent {
  id: 'collider';
  group: string;
  shape: Geometry;
  stay: boolean;
  onEnter?: () => void;
  onStay?: () => void;
  onLeave?: () => void;
}
