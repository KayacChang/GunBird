import { ISpeed } from './types';

export function Speed(value: number): ISpeed {
  return { id: 'speed', value };
}
