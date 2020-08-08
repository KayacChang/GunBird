import { Geometry } from '../constants';
import { ICollider } from '.';
import { nextFrame } from '../functions';

type Props = {
  group: string;
  shape: Geometry;
  onEnter?: () => void;
  onStay?: () => void;
  onLeave?: () => void;
};

export function Collider({
  group,
  shape,
  onEnter = () => {},
  onStay = () => {},
  onLeave = () => {},
}: Props): ICollider {
  let prev = false;

  return {
    id: 'collider',
    group,
    shape,

    get isColliding() {
      return prev;
    },
    set isColliding(cur: boolean) {
      if (!prev && cur) {
        nextFrame().then(onEnter);
      }

      if (prev && cur) {
        onStay();
      }

      if (prev && !cur) {
        nextFrame().then(onLeave);
      }

      prev = cur;
    },
  };
}
