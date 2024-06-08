import { ItemType } from "./item";
import { MapType } from "./map";
import { UserType } from "./user";

export interface LogInputType {
  action: string;
  result: string;
  map: MapType;
  logs: string[];
  monster?: MonsterType;
  user: UserType;
  items: {
    item: ItemType;
    count: number;
  }[];
}

export interface LogOutputType {
  text: string;
  itemsChange: {
    key: string;
    name: string;
    description: string;
    change: number;
  }[];
  hpChange?: number;
  mpChange?: number;
  goldChange?: number;
  damage?: number;
  script: {
    npc: {
      key: string;
      name: string;
      description: string;
      personality: string;
      place: string;
    };
    utterance: string;
  }[];
  encounteredMonster: boolean;
  clear: boolean;
  title: { key: string; name: string; description: string }[];
  statusChange: { key: string; value: number }[];
  exp: number;
}

export interface MapInputType {
  user: string;
  maxLevel: number;
}

export interface ActionInputType {
  map: MapType;
  text: string;
  items: {
    item: ItemType;
    count: number;
  }[];
  npc: NPCType[];
  logs: string[];
  title: {
    key: string;
    name: string;
    description: string;
  }[];
  difficulty: number;
}

export interface ActionOutputType {
  type: SkillTypes;
  difficulty: number;
}
