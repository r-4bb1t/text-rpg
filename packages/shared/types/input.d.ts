import { ItemType } from "./item";
import { MapType } from "./map";

export interface LogInputType {
  action: string;
  result: string;
  map: MapType;
  logs: string[];
  monster?: MonsterType;
  user: string;
  items: {
    item: ItemType;
    count: number;
  }[];
  gold: number;
  hp: number;
  npc: NPCType[];
  mp: number;
}

export interface LogOutputType {
  text: string;
  items: { key: string; name: string; description: string; change: number }[];
  hp?: number;
  mp?: number;
  gold?: number;
  damage?: number;
  script: {
    npc: {
      key: string;
      name: string;
      description: string;
      personality: string;
    };
    text: string;
  }[];
  encounter_monster: boolean;
  clear: boolean;
  status: { key: string; value: number }[];
}
