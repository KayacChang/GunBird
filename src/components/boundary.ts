import { Rect } from '../constants';
import { IBoundary } from './types';

export function Boundary(rect: Rect): IBoundary {
  return { id: 'boundary', rect };
}
