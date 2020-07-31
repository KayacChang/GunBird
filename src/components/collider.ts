import { Geometry } from '../constants';
import { ICollider } from '.';

type Props = {
  group: string;
  shape: Geometry;
  onEnter?: () => void;
  onStay?: () => void;
  onLeave?: () => void;
};

export function Collider({ group, shape, onEnter, onStay, onLeave }: Props): ICollider {
  return { id: 'collider', group, shape, onEnter, onStay, onLeave, stay: false };
}
