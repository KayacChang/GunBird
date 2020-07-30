import { IEntity, ISystem } from '@kayac/ecs.js';
import { IMovement, ITransform } from './types';
import { Vector2 } from '../constants';

export function Movement(vector: Vector2): IMovement {
  return { id: 'movement', vector };
}

export function MovementSystem(): ISystem {
  return {
    id: MovementSystem.name,

    filter: new Set(['movement', 'transform']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        const transform = entity.get('transform') as ITransform;
        const { vector } = entity.get('movement') as IMovement;

        const [mx, my] = vector;
        const [x, y] = transform.position;
        transform.position = [x + mx, y + my];
      });
    },
  };
}
