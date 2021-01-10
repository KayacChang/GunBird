import { Size } from './types';

type SCREEN = 'VGA' | 'SVGA' | 'XGA' | 'HD' | 'FULL_HD';
type ORIENTATION = 'Portrait' | 'Landscape';

const RESOLUTION: Record<SCREEN, [number, number]> = Object.freeze({
  VGA: [640, 480],
  SVGA: [800, 600],
  XGA: [1024, 768],
  HD: [1280, 720],
  FULL_HD: [1920, 1080],
});

export const ACTION = Object.freeze({
  UP: 'w',
  DOWN: 's',
  LEFT: 'a',
  RIGHT: 'd',
  SHOOT: ' ',
});

export function resolution(screen: SCREEN, orientation: ORIENTATION = 'Landscape'): Size {
  if (orientation === 'Portrait') {
    const [height, width] = RESOLUTION[screen];

    return { height, width };
  }

  const [width, height] = RESOLUTION[screen];

  return { width, height };
}
