import { Spritesheet, AnimatedSprite, Container } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Transform, Speed, Collider } from '../components';

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

export default function Bullet() {
  const entity = ECS.entity.create('bullet');

  ECS.component.add(Renderer({ view: View(), layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Speed(60), entity);
  ECS.component.add(
    Collider({
      group: 'bullet',
      shape: { r: 30, c: [0, 0] },
    }),
    entity
  );

  return entity;
}
