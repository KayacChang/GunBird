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
  AreaObserveSystem,
} from '../systems';
import ECS from '@kayac/ecs.js';
import { ITransform } from '../components';
import Enemy from './enemy';
import { Trump_Airship, Marion } from '../models';

function init(app: Application) {
  const player = Character(app, Marion());

  const enemy = Enemy(Trump_Airship());
  const transform = ECS.component.get('transform', enemy) as ITransform;
  transform.position = [app.screen.width / 2, app.screen.height / 4];
}

export default async function main(app: Application) {
  await RES.load();

  init(app);

  ECS.system.add(ControlSystem());
  ECS.system.add(ShootSystem());
  ECS.system.add(MovementSystem());
  ECS.system.add(CollisionSystem(['player', 'enemy', 'bullet', 'pickup']));
  ECS.system.add(BoundarySystem());
  ECS.system.add(DebugSystem());
  ECS.system.add(TransformSystem());
  ECS.system.add(AreaObserveSystem());

  const layers = new Map([
    ['pickup', new Container()],
    ['player', new Container()],
    ['enemy', new Container()],
    ['bullet', new Container()],
    ['effect', new Container()],
    ['debug', new Container()],
  ]);
  app.stage.addChild(...layers.values());
  ECS.system.add(RenderSystem(layers));

  app.ticker.add(ECS.update);
}
