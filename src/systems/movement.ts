import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IMovement, ITransform } from '../components/types';
import { vec2 } from '@kayac/vec2';

export function MovementSystem(): ISystem {
  return {
    id: MovementSystem.name,

    filter: ['movement', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { vector } = ECS.component.get('movement', entity) as IMovement;
        const transform = ECS.component.get('transform', entity) as ITransform;

        const [mx, my] = vec2(vector);
        const [x, y] = vec2(transform.position);
        transform.position = vec2([x + mx, y + my]);

        ECS.component.remove('movement', entity);
      });
    },
  };
}
