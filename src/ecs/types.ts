export interface Component {
  name: string;
}

export type Entity = Map<string, Component>;

export interface System {
  filter: string[];
  update: (delta: number, entities: Entity[]) => void;
}
