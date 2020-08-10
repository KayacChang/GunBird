import { Spritesheet, AnimatedSprite, Container, Sprite } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Status, IStatus, Transform, ITransform } from '../components';
import { Circle, Vec2 } from '../constants';
import { nextFrame } from '../functions';

function View() {
  const it = new Container();

  const texture = RES.get('spritesheet', 'BALLOON') as Spritesheet;

  const idle = new AnimatedSprite(texture.animations['idle']);
  idle.scale.set(2);
  idle.updateAnchor = true;
  idle.animationSpeed = 0.2;
  idle.play();

  const hit = new Sprite(texture.textures['hit.png']);
  hit.scale.set(2);
  hit.visible = false;

  const danger = new Sprite(texture.textures['hurt.png']);
  danger.scale.set(2);
  danger.visible = false;

  it.addChild(danger, hit, idle);

  it.on('hit', async () => {
    idle.visible = false;
    hit.visible = true;

    await nextFrame();

    hit.visible = false;
    idle.visible = true;
  });

  return it;
}

function Explosion(position: Vec2) {
  const texture = RES.get('spritesheet', 'BALLOON_EXPLOSION') as Spritesheet;

  const view = new AnimatedSprite(texture.animations['explosion']);
  view.scale.set(2);
  view.updateAnchor = true;
  view.loop = false;
  view.play();

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'effect' }), entity);
  ECS.component.add(Transform({ position }), entity);

  view.onComplete = () => ECS.entity.remove(entity);
}

export default function Enemy() {
  const view = View();

  const entity = ECS.entity.create();

  ECS.component.add(
    Status({
      life: 17,
      onLifeChange: async (current, previous) => {
        if (previous > current) {
          view.emit('hit');
        }

        if (current <= 0) {
          const { position } = ECS.component.get('transform', entity) as ITransform;
          Explosion(position);

          ECS.entity.remove(entity);
        }
      },
    }),
    entity
  );

  ECS.component.add(
    Renderer({
      view,
      layer: 'enemy',
    }),
    entity
  );

  ECS.component.add(Transform({}), entity);

  ECS.component.add(
    Collider({
      layer: 'enemy',
      masks: ['bullet'],
      shape: { position: [0, -10], radius: view.width / 2 } as Circle,
      onEnter: () => {
        const status = ECS.component.get('status', entity) as IStatus;
        status.life -= 1;
      },
    }),
    entity
  );

  // ECS.component.add(Debug(), entity);

  return entity;
}
