import { IControl } from './types';

export function Control(): IControl {
  return { id: 'control', pressed: [], released: [] };
}
