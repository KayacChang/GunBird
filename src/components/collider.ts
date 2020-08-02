import { Geometry, Circle } from '../constants';
import { ICollider, Renderer, Transform } from '.';
import { Graphics } from 'pixi.js';
import { isCircle } from '../functions';
import ECS from '@kayac/ecs.js';

type Props = {
  group: string;
  shape: Geometry;
  onEnter?: () => void;
  onStay?: () => void;
  onLeave?: () => void;
};

function drawCircle({ c, r }: Circle) {
  const [x, y] = c;

  const graphic = new Graphics();
  graphic.beginFill(0xffffff);
  graphic.drawCircle(x, y, r);
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

function Debug(shape: Geometry) {
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view: View(shape), layer: 'debug' }), entity);
  ECS.component.add(Transform({}), entity);

  return entity;
}

function observe(onEnter: Function, onStay: Function, onLeave: Function) {
  return function view(prev = false) {
    return {
      get isColliding() {
        return prev;
      },
      set isColliding(cur: boolean) {
        if (!prev && cur) {
          onEnter();
        }

        if (prev && cur) {
          onStay();
        }

        if (prev && !cur) {
          onLeave();
        }

        prev = cur;
      },
    };
  };
}

export function Collider({
  group,
  shape,
  onEnter = Function,
  onStay = Function,
  onLeave = Function,
}: Props): ICollider {
  return {
    id: 'collider',
    group,
    shape,

    ...observe(onEnter, onStay, onLeave)(),

    debug: Debug(shape),
  };
}
