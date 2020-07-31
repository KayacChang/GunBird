import { Application } from 'pixi.js';
import { ISystem, IEntity } from '@kayac/ecs.js';
import { IRenderer } from '../components';

export function RenderSystem(app: Application): ISystem {
  const cache: Set<IEntity> = new Set();

  return {
    id: RenderSystem.name,

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
