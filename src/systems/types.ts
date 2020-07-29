import { IComponent } from '../core';
import { DisplayObject } from 'pixi.js';
import { Vector2 } from '../constants';

export interface IRenderer extends IComponent {
  name: 'renderer';
  view: DisplayObject;
}

export interface ITransform extends IComponent {
  name: 'transform';
  position: Vector2;
}

export interface IControl extends IComponent {
  name: 'control';
  keys: Set<string>;
}

export interface IMovement extends IComponent {
  name: 'movement';
  speed: number;
}
