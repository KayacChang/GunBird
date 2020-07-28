import { System, Entity } from '../../ecs';
import { IRenderer, ITransform } from './types';
import { Vector2 } from '../../constants';

type Props = {
  position?: Vector2;
};

export function Transform({ position = [0, 0] }: Props): ITransform {
  return { name: 'transform', position };
}

export function TransformSystem(): System {
  return {
    filter: new Set(['renderer', 'transform']),

    update(delta: number, entities: Entity[]) {
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
