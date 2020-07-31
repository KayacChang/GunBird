import { Container } from 'pixi.js';
import { ISystem, IEntity } from '@kayac/ecs.js';
import { IRenderer } from '../components';

type Layers = Map<string, Container>;

export function RenderSystem(layers: Layers): ISystem {
  const cache = new Set<IEntity>();

  return {
    id: RenderSystem.name,

    filter: new Set(['renderer']),

    update(delta: number, entities: IEntity[]) {
      //
      Array.from(cache)
        .filter((entity) => !entities.includes(entity))
        .forEach((entity) => {
          const { view, layer } = entity.get('renderer') as IRenderer;

          layers.get(layer)?.removeChild(view);
        });

      entities.forEach((entity) => {
        const { view, layer } = entity.get('renderer') as IRenderer;

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
