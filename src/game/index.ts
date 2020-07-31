import { Application, Container } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import {
  RenderSystem,
  TransformSystem,
  ControlSystem,
  MovementSystem,
  ShootSystem,
  CollisionSystem,
  BoundarySystem,
  DebugSystem,
} from '../systems';
import ECS from '@kayac/ecs.js';

export default async function main(app: Application) {
  await RES.load();

  const layers = new Map([
    ['player', new Container()],
    ['bullet', new Container()],
    ['debug', new Container()],
  ]);
  app.stage.addChild(...layers.values());

  Character(app);

  ECS.system.add(ControlSystem());
  ECS.system.add(ShootSystem());
  ECS.system.add(MovementSystem());
  ECS.system.add(CollisionSystem(['player', 'bullet']));
  ECS.system.add(BoundarySystem());
  ECS.system.add(DebugSystem());

  ECS.system.add(TransformSystem());
  ECS.system.add(RenderSystem(layers));

  app.ticker.add(ECS.update);
}
