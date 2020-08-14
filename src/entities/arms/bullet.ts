import { Renderer, Collider, Transform, ITransform, RigidBody } from '../../components';
import ECS from '@kayac/ecs.js';
import { AnimatedSprite } from 'pixi.js';
import { Circle, Vec2 } from '../../constants';

function Impact(view: AnimatedSprite, position: Vec2) {
  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'effect' }), entity);
  ECS.component.add(Transform({ position }), entity);
  view.onComplete = () => ECS.entity.remove(entity);

  return entity;
}

type Props = {
  bulletView: AnimatedSprite;
  impactView: AnimatedSprite;
  velocity: Vec2;
  shape: Circle;
  position: Vec2;
};
export default function Bullet({ bulletView, impactView, velocity, shape, position }: Props) {
  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view: bulletView, layer: 'bullet' }), entity);
  ECS.component.add(Transform({ position }), entity);
  ECS.component.add(RigidBody({ velocity }), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape,
      onEnter: () => {
        const { position } = ECS.component.get('transform', entity) as ITransform;
        Impact(impactView, position);

        ECS.entity.remove(entity);
      },
    }),
    entity
  );

  return entity;
}
