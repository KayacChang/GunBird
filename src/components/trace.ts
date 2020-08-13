import { ITrace } from './types';
import { IEntity } from '@kayac/ecs.js';

type Props = {
  target: IEntity;
  speed: number;
  rotateSpeed: number;
};
export function Trace({ target, speed, rotateSpeed }: Props): ITrace {
  return { id: 'trace', target, speed, rotateSpeed };
}
