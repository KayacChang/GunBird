import { Container, DisplayObject } from 'pixi.js';
import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IRenderer } from '../components';

type Layers = Map<string, Container>;

type Cache = {
  view: DisplayObject;
  layer: string;
};

export function RenderSystem(layers: Layers): ISystem {
  const cache = new Map<IEntity, Cache>();

  return {
    id: RenderSystem.name,

    filter: ['renderer'],

    update(delta: number, entities: IEntity[]) {
      //
      for (const [entity, { view, layer }] of cache) {
        if (!entities.includes(entity)) {
          layers.get(layer)?.removeChild(view);

          cache.delete(entity);
        }
      }

      entities.forEach((entity) => {
        const { view, layer } = ECS.component.get('renderer', entity) as IRenderer;

        const container = layers.get(layer);
        if (!container || cache.has(entity)) {
          return;
        }

        container.addChild(view);
        cache.set(entity, { view, layer });
      });
    },
  };
}
