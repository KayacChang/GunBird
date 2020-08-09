import { IStatus } from './types';

type Props = {
  life: number;
};

export function Status({ life }: Props): IStatus {
  return { id: 'status', life };
}
