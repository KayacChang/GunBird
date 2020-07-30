import { Spritesheet, AnimatedSprite, Container } from 'pixi.js';
import RES from '../resources';
import ECS from '../ecs';
import { Renderer, Transform } from '../systems';

function View() {
  const texture = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['bullet']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  it.addChild(sprite);

  return it;
}

export default function Bullet() {
  const entity = ECS.entity.create('bullet');

  ECS.component.add(Renderer(View()), entity);
  ECS.component.add(Transform({}), entity);

  return entity;
}
