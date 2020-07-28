import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem } from './systems';
import ECS from '../ecs';

export default async function main(app: Application) {
  await RES.load();

  app.ticker.add(ECS.update);

  ECS.system.add(RenderSystem(app));

  init(app);
}

function init(app: Application) {
  const marion = Character();

  marion.x = app.screen.width / 2;
  marion.y = app.screen.height / 2;
}
