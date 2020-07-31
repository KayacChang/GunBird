import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem, TransformSystem, ControlSystem, MovementSystem, ShootSystem, BoundarySystem } from '../systems';
import ECS from '@kayac/ecs.js';

export default async function main(app: Application) {
  await RES.load();

  ECS.system.add(ControlSystem());
  ECS.system.add(ShootSystem());
  ECS.system.add(MovementSystem());
  ECS.system.add(BoundarySystem());
  ECS.system.add(TransformSystem());
  ECS.system.add(RenderSystem(app));

  app.ticker.add(ECS.update);

  requestAnimationFrame(() => init(app));
}

function init(app: Application) {
  Character(app);
}
