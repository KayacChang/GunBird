import { IAreaListener } from './types';
import { Rect } from '../constants';
import { nextFrame } from '../functions';

interface Props {
  rect: Rect;
  onEnter?: () => void;
  onStay?: () => void;
  onLeave?: () => void;
}

export function AreaListener({
  rect,
  onEnter = () => {},
  onStay = () => {},
  onLeave = () => {},
}: Props): IAreaListener {
  let prev = false;

  return {
    id: 'area_listener',
    rect,
    get hasEnter() {
      return prev;
    },
    set hasEnter(cur: boolean) {
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
