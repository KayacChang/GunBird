import { IComponent, IEntity } from '@kayac/ecs.js';
import { DisplayObject } from 'pixi.js';
import { Rect, Geometry } from '../constants';
import { Vec2 } from '@kayac/vec2';

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

export interface IRigidBody extends IComponent {
  id: 'rigid_body';
  force: Vec2;
  mass: number;
  velocity: Vec2;
  angularVelocity: number;
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

export interface ITrace extends IComponent {
  id: 'trace';
  target: IEntity;
}

export interface IArmament extends IComponent {
  id: 'armament';
  fire: boolean;
  level: number;
  arms: IWeapon[][];
}

export interface IWeapon {
  coldDown: number;
  fireRate: number;
  fire: () => IEntity[];
}
