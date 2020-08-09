import { Spritesheet, AnimatedSprite, Container } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Debug } from '../components';
import { Circle } from '../constants';

function View() {
  const texture = RES.get('spritesheet', 'BALLOON') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['idle']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  it.addChild(sprite);

  return it;
}

export default function Enemy() {
  const view = View();

  const entity = ECS.entity.create();

  ECS.component.add(
    Renderer({
      view,
      layer: 'enemy',
    }),
    entity
  );

  ECS.component.add(
    Collider({
      layer: 'enemy',
      masks: ['bullet'],
      shape: { position: [0, -10], radius: view.width / 2 } as Circle,
      onEnter: () => ECS.entity.remove(entity),
    }),
    entity
  );

  // ECS.component.add(Debug(), entity);

  return entity;
}
