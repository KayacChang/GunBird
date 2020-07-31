import { Spritesheet, AnimatedSprite, Container, Application } from 'pixi.js';
import RES from '../resources';
import { Renderer, Transform, Control, Shoot, Speed, Boundary } from '../components';
import ECS from '@kayac/ecs.js';
import Bullet from './bullet';

export default function Character(app: Application) {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const it = new Container();

  const sprite = new AnimatedSprite(texture.animations['marion']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  it.addChild(sprite);

  const entity = ECS.entity.create('marion');
  ECS.component.add(Renderer(it), entity);
  ECS.component.add(
    Transform({
      position: [app.screen.width / 2, app.screen.height / 2],
    }),
    entity
  );
  ECS.component.add(Control(), entity);
  ECS.component.add(Speed(5), entity);
  ECS.component.add(Shoot({ fireRate: 8, bullet: Bullet }), entity);
  ECS.component.add(
    Boundary({
      x: app.screen.x,
      y: app.screen.y,
      w: app.screen.width,
      h: app.screen.height,
    }),
    entity
  );

  return entity;
}
