import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem, TransformSystem, ITransform, ControlSystem, MovementSystem, ShootSystem } from '../systems';
import ECS from '../ecs';

export default async function main(app: Application) {
  await RES.load();

  ECS.system.add(RenderSystem(app));
  ECS.system.add(TransformSystem());
  ECS.system.add(ControlSystem());
  ECS.system.add(MovementSystem());
  ECS.system.add(ShootSystem());

  init(app);
}

function init(app: Application) {
  const marion = Character();

  const transform = marion.get('transform') as ITransform;
  transform.position = [app.screen.width / 2, app.screen.height / 2];

  app.ticker.add(ECS.update);
}
