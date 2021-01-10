# ECS System

### Requirement

- No dependencies.
- Should be small.
- Should be clear.

### Init

```ts
import ECS from './ecs';

app.ticker.add(ECS.update);
```

### Types

```ts
interface Component {
  name: string;
}

interface Entity {
  components: Map<string, Component>;
}

interface System {
  filter: string[];
  update: (delta: number, entities: Entity[]) => void;
}
```

### Entity Manager

```ts
function EntityManager() {
  const entities: Set<Entity> = new Set();

  return {
    create(): Entity {
      const entity = {
        components: new Map<string, Component>(),
      };

      entities.add(entity);

      return entity;
    },

    get() {
      return entities;
    },
  };
}
```

##### Usage

```ts
const entity = ECS.entity.create();
```

### Component Manager

```ts
function add(componet: Component, entity: Entity) {
  return entity.components.set(componet.name, componet);
}

function remove(component: Component, entity: Entity) {
  return entity.components.delete(component.name);
}

function ComponentManager() {
  return {
    add,
    remove,
  };
}
```

##### Usage

```ts
interface Renderer extends Component {
  view: DisplayObject;
}

const renderer: Renderer = { name, view };

ECS.component.add(renderer, entity);
```

### System Manager

```ts
function SystemManager() {
  const systems: Set<System> = new Set();

  return {
    get() {
      return systems;
    },

    add(system: System) {
      return systems.add(system);
    },

    remove(system: System) {
      return systems.delete(system);
    },
  };
}
```

##### Usage

```ts
const name = 'renderer';

function RenderSystem(app: Application): System {
  return {
    filter: [name],

    update(delta: number, entities: Entity[]) {
      app.stage.removeChildren();

      entities.forEach(({ components }) => {
        const { view } = components.get(name) as Renderer;

        app.stage.addChild(view);
      });
    },
  };
}

ECS.system.add(RenderSystem(app));
```
