import { IRigidBody } from './types';
import { Vec2 } from '../constants';

type Props = {
  velocity?: Vec2;
  angularVelocity?: number;
};
export function RigidBody({ velocity = [0, 0], angularVelocity = 0 }: Props): IRigidBody {
  return { id: 'rigid_body', velocity, angularVelocity };
}
