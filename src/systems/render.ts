import { Container } from 'pixi.js';
import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IRenderer } from '../components';

type Layers = Map<string, Container>;

export function RenderSystem(layers: Layers): ISystem {
  const cache = new Set<IEntity>();

  return {
    id: RenderSystem.name,

    filter: ['renderer'],

    update(delta: number, entities: IEntity[]) {
      //
      Array.from(cache)
        .filter((entity) => !entities.includes(entity))
        .forEach((entity) => {
          const { view, layer } = ECS.component.get('renderer', entity) as IRenderer;

          layers.get(layer)?.removeChild(view);
        });

      entities.forEach((entity) => {
        const { view, layer } = ECS.component.get('renderer', entity) as IRenderer;

        const container = layers.get(layer);
        if (!container || cache.has(entity)) {
          return;
        }

        container.addChild(view);
        cache.add(entity);
      });
    },
  };
}
