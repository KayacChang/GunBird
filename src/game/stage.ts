import { Application, Sprite, Texture } from 'pixi.js';
import RES from '../resources';
import ECS from '@kayac/ecs.js';
import { Renderer, Transform, Movement } from '../components';
import { throttle } from '../functions';

function View(app: Application) {
  const texture = RES.get('texture', 'BG_CASTLE') as Texture;
  const background = new Sprite(texture);

  background.anchor.y = 1;
  background.scale.set(app.screen.width / background.width);

  return background;
}

export default function Stage(app: Application) {
  const view = View(app);

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view, layer: 'background' }), entity);
  ECS.component.add(Transform({ position: [0, app.screen.height] }), entity);
  //   ECS.component.add(Velocity([0, 1]), entity);

  //   Scroll debug
  window.addEventListener(
    'wheel',
    throttle(({ deltaY }) => ECS.component.add(Movement([0, -1 * deltaY]), entity))
  );
}
