import RES from '../../resources';
import { Renderer, Collider, Transform, ITransform, RigidBody } from '../../components';
import ECS from '@kayac/ecs.js';
import { AnimatedSprite, Texture, Spritesheet } from 'pixi.js';
import { Circle, Vec2 } from '../../constants';

function BulletView(textures: Texture[]) {
  const bullet = new AnimatedSprite(textures);

  bullet.scale.set(2);
  bullet.updateAnchor = true;
  bullet.play();
  bullet.position.y = -40;

  return bullet;
}

function Impact(position: Vec2) {
  const texture = RES.get('spritesheet', 'BULLET_IMPACT') as Spritesheet;

  const view = new AnimatedSprite(texture.animations['impact']);
  view.scale.set(1.5);
  view.updateAnchor = true;
  view.loop = false;
  view.play();

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'effect' }), entity);
  ECS.component.add(Transform({ position }), entity);
  view.onComplete = () => ECS.entity.remove(entity);

  return entity;
}

type Props = {
  textures: Texture[];
  velocity: Vec2;
  shape: Circle;
};
export default function Bullet({ textures, velocity, shape }: Props) {
  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view: BulletView(textures), layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(RigidBody({ velocity }), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape,
      onEnter: () => {
        const { position } = ECS.component.get('transform', entity) as ITransform;
        Impact(position);

        ECS.entity.remove(entity);
      },
    }),
    entity
  );
  // ECS.component.add(Debug(), entity);

  return entity;
}
