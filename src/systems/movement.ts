import ECS, { ISystem, IEntity } from '@kayac/ecs.js';
import { IMovement, ITransform } from '../components/types';

export function MovementSystem(): ISystem {
  return {
    id: MovementSystem.name,

    filter: ['movement', 'transform'],

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        const { vector } = ECS.component.get('movement', entity) as IMovement;
        const transform = ECS.component.get('transform', entity) as ITransform;

        const [mx, my] = vector;
        const [x, y] = transform.position;
        transform.position = [x + mx, y + my];

        ECS.component.remove('movement', entity);
      });
    },
  };
}
