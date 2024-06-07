import { MonsterType } from "./monster";
import { ENVIRONMENTS } from "@shared/environments";
import { icons } from "lucide-react";

export interface MapType {
  key: string;
  name: string;
  description: string;
  long_description: string;

  monster: MonsterType | null;
  environments: EnvironmentType[];

  startLogs: string[];
}

export interface EnvironmentType {
  key: string;
  name: string;
  icon: keyof typeof icons;
}
