import { Application, Container } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import Bullet from './bullet';
import {
  RenderSystem,
  TransformSystem,
  ControlSystem,
  MovementSystem,
  ShootSystem,
  CollisionSystem,
  BoundarySystem,
  DebugSystem,
  AreaObserveSystem,
} from '../systems';
import ECS from '@kayac/ecs.js';
import { Transform, Boundary, Shoot } from '../components';

export default async function main(app: Application) {
  await RES.load();

  const layers = new Map([
    ['player', new Container()],
    ['bullet', new Container()],
    ['debug', new Container()],
  ]);
  app.stage.addChild(...layers.values());

  const player = Character();
  ECS.component.add(Shoot({ fireRate: 8, bullet: () => Bullet(app) }), player);
  ECS.component.add(
    Transform({
      position: [app.screen.width / 2, app.screen.height / 2],
    }),
    player
  );
  ECS.component.add(
    Boundary({
      x: app.screen.x,
      y: app.screen.y,
      w: app.screen.width,
      h: app.screen.height,
    }),
    player
  );

  ECS.system.add(ControlSystem());
  ECS.system.add(ShootSystem());
  ECS.system.add(MovementSystem());
  ECS.system.add(CollisionSystem(['player', 'bullet']));
  ECS.system.add(BoundarySystem());
  ECS.system.add(DebugSystem());

  ECS.system.add(TransformSystem());
  ECS.system.add(AreaObserveSystem());
  ECS.system.add(RenderSystem(layers));

  app.ticker.add(ECS.update);
}
