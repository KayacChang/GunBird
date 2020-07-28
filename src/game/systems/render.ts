import { DisplayObject, Application } from 'pixi.js';
import { Entity, System } from '../../ecs';
import { IRenderer } from './types';

export function Renderer(view: DisplayObject): IRenderer {
  return { name: 'renderer', view };
}

export function RenderSystem(app: Application): System {
  const cache: Set<Entity> = new Set();

  return {
    filter: new Set(['renderer']),

    update(delta: number, entities: Entity[]) {
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
