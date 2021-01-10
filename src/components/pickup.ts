import { IPickup } from './types';

type PickupType = 'powerup';

export function Pickup(type: PickupType): IPickup {
  return { id: 'pickup', type };
}
