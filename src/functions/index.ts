export * from './vector';
export * from './collision';
export * from './math';
export * from './geometry';

export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}
