import { MonsterType } from "./monster";
import { NPCType } from "./npc";
import { icons } from "lucide-react";

export interface MapType {
  key: string;
  name: string;
  description: string;
  longDescription: string;

  monster: MonsterType | null;
  npc: NPCType[];
  environments: EnvironmentType[];

  startLogs: string[];

  userLocation: string;
}

export interface EnvironmentType {
  key: string;
  name: string;
  icon: keyof typeof icons;
}
