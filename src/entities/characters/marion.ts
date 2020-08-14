import { Armament } from '../../components';
import ECS from '@kayac/ecs.js';
import { Application } from 'pixi.js';
import { MarionBeam, MagicStar } from '../arms';
import Character from './character';
import * as view from '../../views';

export function Marion(app: Application) {
  const entity = Character(app, view.Marion());

  const beam = MarionBeam(entity);
  const magicStar = MagicStar(entity);

  ECS.component.add(
    Armament([
      // Level 01
      // [
      //   {
      //     fireRate: 8,
      //     fire: beam.Level01,
      //   },
      // ],
      // Level 02
      // [
      //   {
      //     fireRate: 8,
      //     fire: beam.Level02,
      //   },
      // ],
      // Level 03
      [
        {
          fireRate: 8,
          fire: beam.Level03,
        },
        {
          fireRate: 64,
          fire: magicStar.Level01,
        },
      ],
      // Level 04
      [
        {
          fireRate: 8,
          fire: beam.Level04,
        },
        {
          fireRate: 16,
          fire: magicStar.Level02,
        },
      ],
    ]),
    entity
  );
}
