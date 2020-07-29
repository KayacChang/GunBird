import entity from './entity';
import system from './system';
import component from './component';
import ECS from '../ecs';

export default { entity, system, component, update: ECS.update };
