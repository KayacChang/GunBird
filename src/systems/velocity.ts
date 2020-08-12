import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IVelocity } from '../components/types';
import { Movement } from '../components';

export function VelocitySystem(): ISystem {
  return {
    id: VelocitySystem.name,

    filter: ['velocity'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { value } = ECS.component.get('velocity', entity) as IVelocity;

        const [vx, vy] = value;
        ECS.component.add(Movement([vx * delta, vy * delta]), entity);
      });
    },
  };
}
