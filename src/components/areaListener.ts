import { IAreaListener } from './types';
import { Rect } from '../constants';

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
        onEnter();
      }

      if (prev && cur) {
        onStay();
      }

      if (prev && !cur) {
        onLeave();
      }

      prev = cur;
    },
  };
}
