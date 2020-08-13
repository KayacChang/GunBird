import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, ITrace, IRigidBody } from '../components/types';
import { normalize, sub, cross } from '../functions';

export function TraceSystem(): ISystem {
  return {
    id: TraceSystem.name,

    filter: ['trace', 'rigid_body'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { target, speed, rotateSpeed } = ECS.component.get('trace', entity) as ITrace;
        const rigidBody = ECS.component.get('rigid_body', entity) as IRigidBody;
        if (!ECS.entity.has(target)) {
          return;
        }

        const thisTransform = ECS.component.get('transform', entity) as ITransform;
        const targetTransform = ECS.component.get('transform', target) as ITransform;

        const dir = normalize(sub(targetTransform.position, thisTransform.position));
        const [, , z] = cross([...dir, 0], [0, 1, 0]);

        rigidBody.angularVelocity = z * rotateSpeed;
        rigidBody.velocity = [0, -1 * speed];
      });
    },
  };
}
