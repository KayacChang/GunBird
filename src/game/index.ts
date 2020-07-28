import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem, TransformSystem, ITransform } from './systems';
import ECS from '../ecs';

export default async function main(app: Application) {
  await RES.load();

  app.ticker.add(ECS.update);

  ECS.system.add(RenderSystem(app));
  ECS.system.add(TransformSystem());

  init(app);
}

function init(app: Application) {
  const marion = Character();

  const transform = marion.get('transform') as ITransform;
  transform.position = [app.screen.width / 2, app.screen.height / 2];
}
