import { Vec2 } from '../constants';
import { IMovement } from './types';

export function Movement(vector: Vec2): IMovement {
  return { id: 'movement', vector };
}
