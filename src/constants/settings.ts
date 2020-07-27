import { Size } from './common';

type SCREEN = 'VGA' | 'SVGA' | 'XGA' | 'HD' | 'FULL_HD';

export const SCREEN_RESOLUTION: Record<SCREEN, Size> = Object.freeze({
  VGA: { width: 640, height: 480 },
  SVGA: { width: 800, height: 600 },
  XGA: { width: 1024, height: 768 },
  HD: { width: 1280, height: 720 },
  FULL_HD: { width: 1920, height: 1080 },
});
