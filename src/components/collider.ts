import { Geometry } from '../constants';
import { ICollider } from '.';
import { IEntity } from '@kayac/ecs.js';
import { nextFrame } from '../functions';

type Behavior = {
  onEnter?: (entities: IEntity[]) => void;
  onStay?: (entities: IEntity[]) => void;
  onLeave?: (entities: IEntity[]) => void;
};

type Props = {
  layer: string;
  masks?: string[];
  shape: Geometry;
} & Behavior;

export function Collider({ layer, masks = [], shape, onEnter, onStay, onLeave }: Props): ICollider {
  let cache: IEntity[] = [];

  return {
    id: 'collider',
    layer,
    masks,
    shape,
    set colliding(entities) {
      const enter: IEntity[] = [];
      const stay: IEntity[] = [];

      entities.forEach((entity) => (cache.includes(entity) ? stay.push(entity) : enter.push(entity)));

      const leave: IEntity[] = cache.filter((entity) => !entities.includes(entity));

      onEnter && nextFrame().then(() => onEnter(enter));
      onStay && onStay(stay);
      onLeave && nextFrame().then(() => onLeave(leave));

      cache = entities;
    },
    get colliding() {
      return Array.from(cache);
    },
  };
}
