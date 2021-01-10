import { IRigidBody } from './types';
import { Vec2 } from '@kayac/vec2';

type Props = {
  velocity?: Vec2;
  angularVelocity?: number;
  force?: Vec2;
  mass?: number;
};
export function RigidBody({ force = [0, 0], mass = 1, velocity = [0, 0], angularVelocity = 0 }: Props): IRigidBody {
  return { id: 'rigid_body', force, mass, velocity, angularVelocity };
}
