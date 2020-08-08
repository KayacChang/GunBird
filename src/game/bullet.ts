import { Spritesheet, AnimatedSprite, Container, Application } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Transform, Speed, Collider, Debug } from '../components';
import { AreaListener } from '../components/areaListener';
import { Circle, Vec2 } from '../constants';
import { nextFrame } from '../functions';

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

function Impact([x, y]: Vec2) {
  const texture = RES.get('spritesheet', 'BULLET_IMPACT') as Spritesheet;

  const it = new AnimatedSprite(texture.animations['impact']);
  it.scale.set(1.2);
  it.updateAnchor = true;
  it.loop = false;

  it.position.set(x, y);
  it.play();

  return it;
}

export default function Bullet({ screen, stage }: Application) {
  const entity = ECS.entity.create();

  const view = View();

  ECS.component.add(Renderer({ view, layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Speed(60), entity);
  ECS.component.add(
    Collider({
      group: 'enemy',
      shape: { radius: 10, position: [0, -30] } as Circle,
      onEnter: () => {
        ECS.entity.remove(entity);

        const impact = Impact([view.position.x, view.position.y]);
        impact.onComplete = () => stage.removeChild(impact);
        stage.addChild(impact);
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
