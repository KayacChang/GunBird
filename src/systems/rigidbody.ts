import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IRigidBody } from '../components/types';
import { Movement } from '../components';
import { div, mul, add, vec2 } from '@kayac/vec2';

export function RigidBodySystem(): ISystem {
  return {
    id: RigidBodySystem.name,

    filter: ['rigid_body'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const rigidBody = ECS.component.get('rigid_body', entity) as IRigidBody;

        const { velocity, force, mass } = rigidBody;

        {
          const acceleration = mul(div(force, mass), delta);

          rigidBody.velocity = add(velocity, acceleration);
        }

        const [vx, vy] = vec2(velocity);
        ECS.component.add(Movement([vx * delta, vy * delta]), entity);
      });
    },
  };
}
