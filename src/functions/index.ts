export * from './vector';
export * from './collision';
export * from './math';
export * from './geometry';

export function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

export function throttle<T>(func: (evt: T) => void) {
  let block = false;

  return async (evt: T) => {
    if (block) {
      return;
    }

    func(evt);

    block = true;

    await nextFrame();

    block = false;
  };
}
