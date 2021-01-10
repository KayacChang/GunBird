import { IArmament, IVulcan, ICharged } from './types';

type Props = {
  arms: Omit<IVulcan, 'coldDown'>[][];
  charged: ICharged;
};

export function Armament({ arms, charged }: Props): IArmament {
  const _arms = arms.map((weapons) =>
    //
    weapons.map((weapon) => ({ coldDown: 0, ...weapon }))
  );
  return { id: 'armament', hasCharged: 0, fire: false, level: 0, arms: _arms, charged };
}
