import { Vector2 } from '../constants';
import { IMovement } from './types';

export function Movement(vector: Vector2): IMovement {
  return { id: 'movement', vector };
}
