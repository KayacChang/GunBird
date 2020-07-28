import { DisplayObject, Application } from 'pixi.js';
import ECS, { Component, Entity, System } from '../ecs';

interface Renderer extends Component {
  view: DisplayObject;
}

const name = 'renderer';

export function addRenderer(entity: Entity, view: DisplayObject) {
  const renderer: Renderer = { name, view };

  ECS.component.add(renderer, entity);
}

export function RenderSystem(app: Application): System {
  return {
    filter: [name],

    update(delta: number, entities: Entity[]) {
      app.stage.removeChildren();

      entities.forEach((entity) => {
        const { view } = entity.get(name) as Renderer;

        app.stage.addChild(view);
      });
    },
  };
}
