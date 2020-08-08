import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ICollider, ITransform, Renderer, Transform } from '../components';
import { isCircle } from '../functions';
import { Graphics } from 'pixi.js';
import { Circle, Geometry, Vec2 } from '../constants';

function drawCircle({ position, radius }: Circle) {
  const [x, y] = position;

  const graphic = new Graphics();
  graphic.beginFill(0xffffff);
  graphic.drawCircle(x, y, radius);
  graphic.endFill();

  graphic.alpha = 0.5;
  graphic.tint = 0x2fd158;

  return graphic;
}

function View(shape: Geometry) {
  if (isCircle(shape)) {
    return drawCircle(shape);
  }

  throw new Error('shape not support ...');
}

function Debug(shape: Geometry, position: Vec2) {
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view: View(shape), layer: 'debug' }), entity);
  ECS.component.add(
    Transform({
      position,
    }),
    entity
  );

  return entity;
}

export function DebugSystem(): ISystem {
  const cache = new Set<IEntity>();

  return {
    id: DebugSystem.name,

    filter: ['debug', 'collider', 'transform'],

    update(delta: number, entities: IEntity[]) {
      cache.forEach((debug) => {
        ECS.entity.remove(debug);
        cache.delete(debug);
      });

      entities.forEach((entity) => {
        const collider = ECS.component.get('collider', entity) as ICollider;

        const { position } = ECS.component.get('transform', entity) as ITransform;

        const debug = Debug(collider.shape, position);

        cache.add(debug);
      });
    },
  };
}
