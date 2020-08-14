import ECS, { IEntity } from '@kayac/ecs.js';
import { DisplayObject } from 'pixi.js';
import { Renderer, Transform, Collider, IRenderer, ITransform, RigidBody } from '../../components';
import { Circle, Vec2 } from '../../constants';
import { Trace } from '../../components/trace';
import { sub, magnitude } from '../../functions';

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

    const len1 = magnitude(sub(compare.position, thisTransform.position));
    const len2 = magnitude(sub(nearest.position, thisTransform.position));

    return len1 > len2 ? pre : cur;
  });
}

type Props = {
  speed: number;
  rotateSpeed: number;
  shape: Circle;
  view: DisplayObject;
  position: Vec2;
};
export default function Missile({ speed, rotateSpeed, shape, view, position }: Props) {
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view, layer: 'bullet' }), entity);
  ECS.component.add(Transform({ position }), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape,
      onEnter: () => ECS.entity.remove(entity),
    }),
    entity
  );

  const target = findNearestEnemy(entity);
  if (!target) {
    ECS.component.add(RigidBody({ velocity: [0, -1 * speed] }), entity);

    return entity;
  }

  ECS.component.add(RigidBody({}), entity);
  ECS.component.add(Trace({ target, speed, rotateSpeed }), entity);

  return entity;
}
