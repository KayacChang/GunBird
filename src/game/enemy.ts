import { Spritesheet, AnimatedSprite, Container, Sprite } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Collider, Status, IStatus } from '../components';
import { Circle } from '../constants';
import { nextFrame } from '../functions';

function View() {
  const texture = RES.get('spritesheet', 'BALLOON') as Spritesheet;

  const it = new Container();

  const idle = new AnimatedSprite(texture.animations['idle']);
  idle.scale.set(2);
  idle.updateAnchor = true;
  idle.animationSpeed = 0.2;
  idle.play();

  const hit = new Sprite(texture.textures['hit.png']);
  hit.scale.set(2);
  hit.visible = false;

  const hurt = new Sprite(texture.textures['hurt.png']);
  hurt.scale.set(2);
  hurt.visible = false;

  it.addChild(hurt, hit, idle);

  it.on('hit', async () => {
    idle.visible = false;
    hit.visible = true;

    await nextFrame();

    hit.visible = false;
    idle.visible = true;
  });

  return it;
}

export default function Enemy() {
  const view = View();

  const entity = ECS.entity.create();

  ECS.component.add(
    Status({
      life: 17,
      onLifeChange: (current, previous) => {
        if (previous > current) {
          view.emit('hit');
        }

        if (current <= 0) {
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
