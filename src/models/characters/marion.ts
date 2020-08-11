import RES from '../../resources';
import {
  Renderer,
  Control,
  Speed,
  Collider,
  Transform,
  Boundary,
  Shoot,
  IPickup,
  ITransform,
  Debug,
  Velocity,
} from '../../components';
import ECS from '@kayac/ecs.js';
import { Application, Spritesheet, Container, AnimatedSprite } from 'pixi.js';
import { Circle, Vec2 } from '../../constants';

export default function Character(app: Application) {
  const texture = RES.get('spritesheet', 'MARION_IDLE') as Spritesheet;

  const view = new Container();

  const sprite = new AnimatedSprite(texture.animations['marion']);
  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  view.addChild(sprite);

  const entity = ECS.entity.create('marion');
  ECS.component.add(Renderer({ view, layer: 'player' }), entity);
  ECS.component.add(Control(), entity);
  ECS.component.add(Speed(5), entity);
  ECS.component.add(
    Collider({
      layer: 'player',
      masks: ['pickup'],
      shape: { radius: 10, position: [0, 0] } as Circle,
      onEnter: (colliding) => {
        //
        colliding.forEach((entity) => {
          const pickup = ECS.component.get('pickup', entity) as IPickup;
          if (pickup && pickup.type === 'powerup') {
            console.log('power up');

            ECS.entity.remove(entity);
          }
        });
      },
    }),
    entity
  );
  ECS.component.add(Shoot({ fireRate: 8, bullet: Bullet03 }), entity);
  ECS.component.add(Transform({ position: [app.screen.width / 2, app.screen.height / 2] }), entity);
  ECS.component.add(
    Boundary({
      position: [app.screen.x, app.screen.y],
      size: [app.screen.width, app.screen.height],
    }),
    entity
  );
  // ECS.component.add(Debug(), entity);

  return entity;
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

function Bullet03() {
  const texture = RES.get('spritesheet', 'MARION_BULLET_03') as Spritesheet;
  const bulletL = new AnimatedSprite(texture.animations['bullet_L']);
  const bulletR = new AnimatedSprite(texture.animations['bullet_R']);

  const view = new Container();
  bulletL.scale.set(2);
  bulletL.updateAnchor = true;
  bulletL.animationSpeed = 0.2;
  bulletL.play();
  bulletL.position.y = -40;

  view.addChild(bulletL);

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Velocity([-1 * Math.sin(Math.PI / 12) * 60, -1 * Math.cos(Math.PI / 12) * 60]), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape: { radius: 10, position: [-2, -30] } as Circle,
      onEnter: () => {
        const { position } = ECS.component.get('transform', entity) as ITransform;
        Impact(position);

        ECS.entity.remove(entity);
      },
    }),
    entity
  );
  ECS.component.add(Debug(), entity);

  return entity;
}

function Bullet02() {
  const texture = RES.get('spritesheet', 'MARION_BULLET_02') as Spritesheet;
  const sprite = new AnimatedSprite(texture.animations['level02']);

  const view = new Container();

  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  // offset
  sprite.position.y = -40;

  view.addChild(sprite);

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Speed(60), entity);
  ECS.component.add(
    Collider({
      layer: 'bullet',
      shape: { radius: 15, position: [0, -30] } as Circle,
      onEnter: () => {
        const { position } = ECS.component.get('transform', entity) as ITransform;
        Impact(position);

        ECS.entity.remove(entity);
      },
    }),
    entity
  );
  ECS.component.add(Debug(), entity);

  return entity;
}

function Bullet01() {
  const texture = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;
  const sprite = new AnimatedSprite(texture.animations['bullet']);

  const view = new Container();

  sprite.scale.set(2);
  sprite.updateAnchor = true;
  sprite.animationSpeed = 0.2;
  sprite.play();

  // offset
  sprite.position.y = -40;

  view.addChild(sprite);

  const entity = ECS.entity.create();
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

  return entity;
}
