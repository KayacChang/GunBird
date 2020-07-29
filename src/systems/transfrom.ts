import { IEntity } from '../core';
import { IRenderer, ITransform } from './types';
import { Vector2 } from '../constants';

type Props = {
  position?: Vector2;
};

export function Transform({ position = [0, 0] }: Props): ITransform {
  return { name: 'transform', position };
}

export function TransformSystem() {
  return {
    name: 'TransformSystem',

    filter: new Set(['renderer', 'transform']),

    update(delta: number, entities: IEntity[]) {
      //
      entities.forEach((entity) => {
        //
        const { view } = entity.get('renderer') as IRenderer;
        const { position } = entity.get('transform') as ITransform;

        const [x, y] = position;
        view.position.set(x, y);
      });
    },
  };
}
