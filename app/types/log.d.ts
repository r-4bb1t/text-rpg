import { SkillTypes } from "./user";

export interface LogType {
  prefix?: string;
  type: "user" | "system" | "npc" | "move";
  text: string;
  changes: {
    key: string;
    value: number;
  }[];
  info?: {
    type: SkillTypes;
    difficulty: number;
    value: number;
  };
  npc?: string;
}
