import { IComponent, IEntity } from '@kayac/ecs.js';
import { DisplayObject } from 'pixi.js';
import { Vec2, Rect, Geometry } from '../constants';

export interface IRenderer extends IComponent {
  id: 'renderer';
  view: DisplayObject;
  layer: string;
}

export interface ITransform extends IComponent {
  id: 'transform';
  position: Vec2;
}

export interface IControl extends IComponent {
  id: 'control';
}

export interface IMovement extends IComponent {
  id: 'movement';
  vector: Vec2;
}

export interface ISpeed extends IComponent {
  id: 'speed';
  value: number;
}

export interface IVelocity extends IComponent {
  id: 'velocity';
  value: Vec2;
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
  layer: string;
  masks: string[];
  shape: Geometry;
  colliding: IEntity[];
}

export interface IDebug extends IComponent {
  id: 'debug';
}

export interface IAreaListener extends IComponent {
  id: 'area_listener';
  rect: Rect;
  hasEnter: boolean;
}

export interface IStatus extends IComponent {
  id: 'status';
  life: number;
}

export interface IPickup extends IComponent {
  id: 'pickup';
  type: 'powerup';
}
