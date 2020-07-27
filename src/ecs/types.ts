export interface Component {
  name: string;
}

export interface Entity {
  components: Map<string, Component>;
}

export interface System {
  filter: string[];
  update: (delta: number, entities: Entity[]) => void;
}
