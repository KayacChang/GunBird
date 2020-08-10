import { Spritesheet, AnimatedSprite, Container, Application } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Transform, Speed, Collider, ITransform } from '../components';
import { AreaListener } from '../components/areaListener';
import { Circle, Vec2 } from '../constants';

function View() {
  const texture = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['bullet']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  // offset
  sprite.position.y = -40;

  it.addChild(sprite);

  return it;
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
}

export default function Bullet({ screen }: Application) {
  const entity = ECS.entity.create();

  const view = View();

  ECS.component.add(Renderer({ view, layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Speed(60), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape: { radius: 10, position: [0, -30] } as Circle,
      onEnter: () => {
        const { position } = ECS.component.get('transform', entity) as ITransform;
        Impact(position);

        ECS.entity.remove(entity);
      },
    }),
    entity
  );
  // ECS.component.add(Debug(), entity);
  ECS.component.add(
    AreaListener({
      rect: { position: [0, 0], size: [screen.width, screen.height] },
      onLeave: () => ECS.entity.remove(entity),
    }),
    entity
  );

  return entity;
}
