import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IRigidBody } from '../components/types';
import { Movement } from '../components';
import { rotate } from '../functions';

export function RigidBodySystem(): ISystem {
  return {
    id: RigidBodySystem.name,

    filter: ['rigid_body'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { velocity, angularVelocity } = ECS.component.get('rigid_body', entity) as IRigidBody;

        const [vx, vy] = rotate(velocity, angularVelocity);

        ECS.component.add(Movement([vx * delta, vy * delta]), entity);
      });
    },
  };
}
