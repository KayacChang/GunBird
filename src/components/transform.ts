import { Vec2 } from '../constants';
import { ITransform } from './types';

type Props = {
  position?: Vec2;
};

export function Transform({ position = [0, 0] }: Props): ITransform {
  return { id: 'transform', position };
}
