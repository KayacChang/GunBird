import { IVelocity } from './types';
import { Vec2 } from '../constants';

export function Velocity(value: Vec2): IVelocity {
  return { id: 'velocity', value };
}
