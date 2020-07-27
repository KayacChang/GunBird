import { Application } from 'pixi.js';
import RES from '../resources';
import Character from './character';
import { RenderSystem, addRenderer } from './render';
import ECS from '../ecs';

export default async function main(app: Application) {
  await RES.load();

  app.ticker.add(ECS.update);

  ECS.system.add(RenderSystem(app));

  const marion = Character();
  marion.x = app.screen.width / 2;
  marion.y = app.screen.height / 2;

  const entity = ECS.entity.create();
  addRenderer(entity, marion);
}
