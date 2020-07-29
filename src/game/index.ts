import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem, TransformSystem, ITransform, ControlSystem, MovementSystem } from '../systems';
import { ecs } from '../core';

export default async function main(app: Application) {
  await RES.load();

  ecs.system.add('RenderSystem', RenderSystem(app));
  ecs.system.add('TransformSystem', TransformSystem());
  ecs.system.add('ControlSystem', ControlSystem());
  ecs.system.add('MovementSystem', MovementSystem());

  init(app);
}

function init(app: Application) {
  const marion = Character();

  const transform = marion.get('transform') as ITransform;
  transform.position = [app.screen.width / 2, app.screen.height / 2];

  app.ticker.add(ecs.update);
}
