import ECS, { IEntity, ISystem } from '@kayac/ecs.js';
import { ITransform, ITrace, IRigidBody } from '../components/types';
import { normalize, sub, cross, clamp } from '../functions';

function lerp(x: number, y: number, t: number) {
  return x * (1 - t) + y * t;
}

export function TraceSystem(): ISystem {
  return {
    id: TraceSystem.name,

    filter: ['trace', 'rigid_body'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { target } = ECS.component.get('trace', entity) as ITrace;
        const rigidBody = ECS.component.get('rigid_body', entity) as IRigidBody;
        if (!ECS.entity.has(target)) {
          return;
        }

        const thisTransform = ECS.component.get('transform', entity) as ITransform;
        const targetTransform = ECS.component.get('transform', target) as ITransform;

        const [ax, ay] = normalize(rigidBody.force);
        const [bx, by] = normalize(sub(targetTransform.position, thisTransform.position));

        rigidBody.force = [lerp(ax, bx, clamp(0, 1, delta * 0.5)), lerp(ay, by, clamp(0, 1, delta * 0.5))];
      });
    },
  };
}
