import { Container, Spritesheet, AnimatedSprite, Sprite } from 'pixi.js';
import ECS from '@kayac/ecs.js';
import RES from '../../resources';
import { nextFrame } from '../../functions';
import { Vec2 } from '../../constants';
import { Renderer, Transform } from '../../components';

export function Trump_Airship() {
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

  it.once('dead', () => Explosion([it.position.x, it.position.y]));

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
