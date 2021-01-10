import { IMovement } from './types';
import { Vec2 } from '@kayac/vec2';

export function Movement(vector: Vec2): IMovement {
  return { id: 'movement', vector };
}
