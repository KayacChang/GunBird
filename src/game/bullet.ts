import { Spritesheet, AnimatedSprite, Container, Application } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Transform, Speed, Collider } from '../components';
import { AreaListener } from '../components/areaListener';

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

export default function Bullet({ screen }: Application) {
  const entity = ECS.entity.create();

  ECS.component.add(Renderer({ view: View(), layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Speed(60), entity);
  ECS.component.add(
    Collider({
      group: 'bullet',
      shape: { r: 10, c: [0, -30] },
    }),
    entity
  );
  ECS.component.add(
    AreaListener({
      rect: { x: 0, y: 0, w: screen.width, h: screen.height },
      onLeave: () => {
        ECS.entity.remove(entity);
      },
    }),
    entity
  );

  return entity;
}
