import { DisplayObject, Application } from 'pixi.js';
import { IRenderer } from '.';
import { ISystem, IEntity } from '../core';

export function Renderer(view: DisplayObject): IRenderer {
  return { name: 'renderer', view };
}

export function RenderSystem(app: Application): ISystem {
  const cache: Set<IEntity> = new Set();

  return {
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
