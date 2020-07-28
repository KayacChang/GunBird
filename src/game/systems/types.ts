import { Component } from '../../ecs';
import { DisplayObject } from 'pixi.js';
import { Vector2 } from '../../constants/common';

export interface IRenderer extends Component {
  name: 'renderer';
  view: DisplayObject;
}

export interface ITransform extends Component {
  name: 'transform';
  position: Vector2;
}
