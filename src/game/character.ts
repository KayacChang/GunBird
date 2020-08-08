import { Spritesheet, AnimatedSprite, Container } from 'pixi.js';
import RES from '../resources';
import { Renderer, Control, Speed, Collider } from '../components';
import ECS from '@kayac/ecs.js';

export default function Character() {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['marion']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  it.addChild(sprite);

  const entity = ECS.entity.create('marion');
  ECS.component.add(Renderer({ view: it, layer: 'player' }), entity);
  ECS.component.add(Control(), entity);
  ECS.component.add(Speed(5), entity);
  ECS.component.add(Collider({ group: 'player', shape: { r: 10, c: [0, 0] } }), entity);

  return entity;
}
