import { DisplayObject, Application } from 'pixi.js';
import { Component, Entity, System } from '../../ecs';

interface Renderer extends Component {
  view: DisplayObject;
}

const name = 'renderer';

export function Renderer(view: DisplayObject): Renderer {
  return { name, view };
}

export function RenderSystem(app: Application): System {
  const cache: Set<Entity> = new Set();

  return {
    filter: new Set([name]),

    update(delta: number, entities: Entity[]) {
      //
      entities.forEach((entity) => {
        //
        if (cache.has(entity)) {
          return;
        }

        const { view } = entity.get(name) as Renderer;
        app.stage.addChild(view);

        cache.add(entity);
      });
    },
  };
}
