import { Application, Container, Sprite, Texture } from 'pixi.js';
import RES from '../resources';
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
  VelocitySystem,
} from '../systems';
import ECS from '@kayac/ecs.js';
import { ITransform, Renderer, Velocity, Transform } from '../components';
import Enemy from './enemy';
import { Trump_Airship, Marion } from '../models';

function Stage(app: Application) {
  const texture = RES.get('texture', 'BG_CASTLE') as Texture;
  const background = new Sprite(texture);

  background.anchor.y = 1;

  const ratio = app.screen.width / background.width;
  background.scale.set(ratio);

  const entity = ECS.entity.create();
  ECS.component.add(Renderer({ view: background, layer: 'background' }), entity);
  ECS.component.add(Transform({ position: [0, app.screen.height] }), entity);
  ECS.component.add(Velocity([0, 1]), entity);
}

function init(app: Application) {
  Marion(app);

  {
    const enemy = Enemy(Trump_Airship());
    const transform = ECS.component.get('transform', enemy) as ITransform;
    transform.position = [app.screen.width * (1 / 4), app.screen.height / 4];
  }

  {
    const enemy = Enemy(Trump_Airship());
    const transform = ECS.component.get('transform', enemy) as ITransform;
    transform.position = [app.screen.width * (2 / 4), app.screen.height / 4];
  }

  {
    const enemy = Enemy(Trump_Airship());
    const transform = ECS.component.get('transform', enemy) as ITransform;
    transform.position = [app.screen.width * (3 / 4), app.screen.height / 4];
  }

  Stage(app);
}

export default async function main(app: Application) {
  await RES.load();

  init(app);

  ECS.system.add(ControlSystem());
  ECS.system.add(ShootSystem(app));
  ECS.system.add(VelocitySystem());
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
    ['player', new Container()],
    ['bullet', new Container()],
    ['effect', new Container()],
    ['debug', new Container()],
  ]);
  app.stage.addChild(...layers.values());
  ECS.system.add(RenderSystem(layers));

  app.ticker.add(ECS.update);
}
