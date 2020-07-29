import { DisplayObject, Application } from 'pixi.js';
import { IEntity, ISystem } from '../core';
import { IRenderer } from './types';

export function Renderer(view: DisplayObject): IRenderer {
  return { name: 'renderer', view };
}

export function RenderSystem(app: Application) {
  const cache: Set<IEntity> = new Set();

  return {
    name: 'RenderSystem',

    filter: new Set(['renderer']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        if (cache.has(entity)) {
          return;
        }

        const { view } = entity.get('renderer') as IRenderer;
        app.stage.addChild(view);

        cache.add(entity);
      });
    },
  };
}
