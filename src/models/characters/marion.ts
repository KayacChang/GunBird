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
  IShoot,
} from '../../components';
import ECS from '@kayac/ecs.js';
import { Application, Spritesheet, Container, AnimatedSprite, Texture } from 'pixi.js';
import { Circle, Vec2 } from '../../constants';
import { clamp, mul, dir } from '../../functions';

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
        colliding.forEach((collide) => {
          const pickup = ECS.component.get('pickup', collide) as IPickup;
          if (pickup && pickup.type === 'powerup') {
            const shoot = ECS.component.get('shoot', entity) as IShoot;
            shoot.level = clamp(shoot.level + 1, 0, 4);

            ECS.entity.remove(collide);
          }
        });
      },
    }),
    entity
  );
  ECS.component.add(Shoot({ fireRate: 8, army: Army() }), entity);
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

function BulletView(textures: Texture[]) {
  const bullet = new AnimatedSprite(textures);

  bullet.scale.set(2);
  bullet.updateAnchor = true;
  bullet.animationSpeed = 0.5;
  bullet.play();
  bullet.position.y = -40;

  return bullet;
}

type Props = {
  view: Container;
  velocity: Vec2;
  shape: Circle;
};
function BulletEntity({ view, velocity, shape }: Props) {
  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'bullet' }), entity);
  ECS.component.add(Transform({}), entity);
  ECS.component.add(Velocity(velocity), entity);
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

function Army() {
  const L1 = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;
  const L2 = RES.get('spritesheet', 'MARION_BULLET_02') as Spritesheet;
  const L3 = RES.get('spritesheet', 'MARION_BULLET_03') as Spritesheet;
  const L4 = RES.get('spritesheet', 'MARION_BULLET_04') as Spritesheet;

  const speed = 60;

  function Level01() {
    return [
      BulletEntity({
        view: BulletView(L1.animations['marion_bullet_L1']),
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
    ];
  }

  function Level02() {
    return [
      BulletEntity({
        view: BulletView(L2.animations['marion_bullet_L2']),
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
    ];
  }

  function Level03() {
    return [
      BulletEntity({
        view: BulletView(L3.animations['marion_bullet_L_L1']),
        velocity: mul(dir(Math.PI / 12), [-1 * speed, -1 * speed]),
        shape: { radius: 10, position: [-2, 5] },
      }),
      BulletEntity({
        view: BulletView(L1.animations['marion_bullet_L1']),
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
      BulletEntity({
        view: BulletView(L3.animations['marion_bullet_R_L1']),
        velocity: mul(dir(Math.PI / 12), [1 * speed, -1 * speed]),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  function Level04() {
    return [
      BulletEntity({
        view: BulletView(L4.animations['marion_bullet_L_L2']),
        velocity: mul(dir(Math.PI / 12), [-1 * speed, -1 * speed]),
        shape: { radius: 10, position: [-2, 5] },
      }),
      BulletEntity({
        view: BulletView(L2.animations['marion_bullet_L2']),
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
      BulletEntity({
        view: BulletView(L4.animations['marion_bullet_R_L2']),
        velocity: mul(dir(Math.PI / 12), [1 * speed, -1 * speed]),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  return (level: number) => [Level01, Level02, Level03, Level04][level];
}
