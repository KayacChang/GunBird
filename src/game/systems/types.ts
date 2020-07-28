import { Component } from '../../ecs';
import { DisplayObject } from 'pixi.js';
import { Vector2 } from '../../constants';

export interface IRenderer extends Component {
  name: 'renderer';
  view: DisplayObject;
}

export interface ITransform extends Component {
  name: 'transform';
  position: Vector2;
}

export interface IControl extends Component {
  name: 'control';
  keys: Set<string>;
}

export interface IMovement extends Component {
  name: 'movement';
  speed: number;
}
