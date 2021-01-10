import { IStatus } from './types';

type Props = {
  life: number;
  onLifeChange?: (cur: number, prev: number) => void;
};

export function Status({ life, onLifeChange }: Props): IStatus {
  return {
    id: 'status',

    get life() {
      return life;
    },
    set life(val) {
      onLifeChange && onLifeChange(val, life);

      life = val;
    },
  };
}
