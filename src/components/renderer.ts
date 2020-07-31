import { DisplayObject } from 'pixi.js';
import { IRenderer } from './types';

type Props = {
  view: DisplayObject;
  layer: string;
};
export function Renderer({ view, layer }: Props): IRenderer {
  return { id: 'renderer', view, layer };
}
