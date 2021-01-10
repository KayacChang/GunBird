import { ITrace } from './types';
import { IEntity } from '@kayac/ecs.js';

type Props = {
  target: IEntity;
};
export function Trace({ target }: Props): ITrace {
  return { id: 'trace', target };
}
