import RES from '../../resources';
import {
  Renderer,
  Control,
  Speed,
  Collider,
  Transform,
  Boundary,
  IPickup,
  Armament,
  IArmament,
} from '../../components';
import ECS from '@kayac/ecs.js';
import { Application, Spritesheet, Container, AnimatedSprite } from 'pixi.js';
import { Circle } from '../../constants';
import { clamp, mul, dir } from '../../functions';
import Bullet from '../arms/bullet';
import Missile from '../arms/missile';

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
            const armament = ECS.component.get('armament', entity) as IArmament;
            armament.level = clamp(armament.level + 1, 0, 4);

            ECS.entity.remove(collide);
          }
        });
      },
    }),
    entity
  );

  const vulcan = Vulcan();
  const magicStar = MagicStar();

  ECS.component.add(
    Armament([
      // Level 01
      [
        {
          fireRate: 8,
          fire: vulcan.Level01,
        },
      ],
      // Level 02
      [
        {
          fireRate: 8,
          fire: vulcan.Level02,
        },
      ],
      // Level 03
      [
        {
          fireRate: 8,
          fire: vulcan.Level03,
        },
        {
          fireRate: 64,
          fire: magicStar.Level01,
        },
      ],
      // Level 04
      [
        {
          fireRate: 8,
          fire: vulcan.Level04,
        },
        {
          fireRate: 16,
          fire: magicStar.Level02,
        },
      ],
    ]),
    entity
  );

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

function Vulcan() {
  const L1 = RES.get('spritesheet', 'MARION_BULLET_01') as Spritesheet;
  const L2 = RES.get('spritesheet', 'MARION_BULLET_02') as Spritesheet;
  const L3 = RES.get('spritesheet', 'MARION_BULLET_03') as Spritesheet;
  const L4 = RES.get('spritesheet', 'MARION_BULLET_04') as Spritesheet;

  const speed = 60;

  function Level01() {
    return [
      Bullet({
        textures: L1.animations['marion_bullet_L1'],
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
    ];
  }

  function Level02() {
    return [
      Bullet({
        textures: L2.animations['marion_bullet_L2'],
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
    ];
  }

  function Level03() {
    return [
      Bullet({
        textures: L3.animations['marion_bullet_L_L1'],
        velocity: mul(dir(Math.PI / 12), [-1 * speed, -1 * speed]),
        shape: { radius: 10, position: [-2, 5] },
      }),
      Bullet({
        textures: L1.animations['marion_bullet_L1'],
        velocity: [0, -1 * speed],
        shape: { radius: 10, position: [0, 5] },
      }),
      Bullet({
        textures: L3.animations['marion_bullet_R_L1'],
        velocity: mul(dir(Math.PI / 12), [1 * speed, -1 * speed]),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  function Level04() {
    return [
      Bullet({
        textures: L4.animations['marion_bullet_L_L2'],
        velocity: mul(dir(Math.PI / 12), [-1 * speed, -1 * speed]),
        shape: { radius: 10, position: [-2, 5] },
      }),
      Bullet({
        textures: L2.animations['marion_bullet_L2'],
        velocity: [0, -1 * speed],
        shape: { radius: 15, position: [0, 5] },
      }),
      Bullet({
        textures: L4.animations['marion_bullet_R_L2'],
        velocity: mul(dir(Math.PI / 12), [1 * speed, -1 * speed]),
        shape: { radius: 10, position: [2, 5] },
      }),
    ];
  }

  return {
    Level01,
    Level02,
    Level03,
    Level04,
  };
}

function MagicStar() {
  function Level01() {
    return [
      Missile({
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  function Level02() {
    return [
      Missile({
        shape: { radius: 15, position: [0, 0] },
      }),
    ];
  }

  return {
    Level01,
    Level02,
  };
}
