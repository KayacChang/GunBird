import RES from '../../resources';
import ECS, { IEntity } from '@kayac/ecs.js';
import { Texture, Sprite } from 'pixi.js';
import { Renderer, Transform, Collider, IRenderer, ITransform, RigidBody } from '../../components';
import { Circle } from '../../constants';
import { Trace } from '../../components/trace';
import { sub, magnitude } from '../../functions';

function View() {
  const texture = RES.get('texture', 'MARION_MISSILE') as Texture;

  const missile = new Sprite(texture);
  missile.anchor.set(0.5);
  missile.scale.set(2);

  return missile;
}

function findNearestEnemy(entity: IEntity) {
  const enemies = ECS.entity.query('renderer').filter((entity) => {
    const { layer } = ECS.component.get('renderer', entity) as IRenderer;
    return layer === 'enemy';
  });

  if (enemies.length <= 0) {
    return undefined;
  }

  return enemies.reduce((pre, cur) => {
    const nearest = ECS.component.get('transform', pre) as ITransform;
    const compare = ECS.component.get('transform', cur) as ITransform;
    const thisTransform = ECS.component.get('transform', entity) as ITransform;

    return magnitude(sub(compare.position, thisTransform.position)) >
      magnitude(sub(nearest.position, thisTransform.position))
      ? cur
      : pre;
  });
}

type Props = {
  shape: Circle;
};
export default function Missile({ shape }: Props) {
  const speed = 10;
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view: View(), layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape,
      onEnter: () => ECS.entity.remove(entity),
    }),
    entity
  );

  const target = findNearestEnemy(entity);
  if (target) {
    ECS.component.add(RigidBody({}), entity);

    ECS.component.add(
      Trace({
        target,
        speed,
        rotateSpeed: Math.PI / 2,
      }),
      entity
    );
  } else {
    ECS.component.add(RigidBody({ velocity: [0, -1 * speed] }), entity);
  }

  // ECS.component.add(Debug(), entity);

  return entity;
}
