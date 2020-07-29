import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem, TransformSystem, ITransform, ControlSystem, MovementSystem } from '../systems';
import ECS from '../core/ecs';
import { addSystem } from '../core';

export default async function main(app: Application) {
  await RES.load();

  addSystem(RenderSystem(app));
  addSystem(TransformSystem());
  addSystem(ControlSystem());
  addSystem(MovementSystem());

  init(app);
}

function init(app: Application) {
  const marion = Character();

  const transform = marion.getComponent('transform') as ITransform;
  transform.position = [app.screen.width / 2, app.screen.height / 2];

  app.ticker.add(update);
}

function update(delta: number) {
  ECS.update(delta);
}
