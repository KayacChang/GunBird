import { DisplayObject } from 'pixi.js';
import { IRenderer } from './types';

export function Renderer(view: DisplayObject): IRenderer {
  return { id: 'renderer', view };
}
