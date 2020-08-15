import { Application, Container } from 'pixi.js';
import RES from '../resources';
import {
  RenderSystem,
  TransformSystem,
  ControlSystem,
  MovementSystem,
  ArmamentSystem,
  CollisionSystem,
  BoundarySystem,
  DebugSystem,
  AreaObserveSystem,
  RigidBodySystem,
  TraceSystem,
} from '../systems';
import ECS from '@kayac/ecs.js';
import { ITransform } from '../components';
import { Trump_Airship, Marion } from '../entities';
import Stage from './stage';

function init(app: Application) {
  Marion(app);

  {
    const enemy = Trump_Airship();
    const transform = ECS.component.get('transform', enemy) as ITransform;
    transform.position = [app.screen.width * (1 / 4), app.screen.height / 4];
  }

  {
    const enemy = Trump_Airship();
    const transform = ECS.component.get('transform', enemy) as ITransform;
    transform.position = [app.screen.width * (2 / 4), app.screen.height / 4];
  }

  {
    const enemy = Trump_Airship();
    const transform = ECS.component.get('transform', enemy) as ITransform;
    transform.position = [app.screen.width * (3 / 4), app.screen.height / 4];
  }

  Stage(app);
}

export default async function main(app: Application) {
  await RES.load();

  init(app);

  ECS.system.add(ControlSystem());
  ECS.system.add(ArmamentSystem(app));
  ECS.system.add(TraceSystem());
  ECS.system.add(RigidBodySystem());
  ECS.system.add(MovementSystem());
  ECS.system.add(CollisionSystem(['player', 'enemy', 'bullet', 'pickup']));
  ECS.system.add(BoundarySystem());
  ECS.system.add(DebugSystem());
  ECS.system.add(TransformSystem());
  ECS.system.add(AreaObserveSystem());

  const layers = new Map([
    ['background', new Container()],
    ['pickup', new Container()],
    ['enemy', new Container()],
    ['bullet', new Container()],
    ['player', new Container()],
    ['effect', new Container()],
    ['debug', new Container()],
  ]);
  app.stage.addChild(...layers.values());
  ECS.system.add(RenderSystem(layers));

  app.ticker.add(ECS.update);
}
