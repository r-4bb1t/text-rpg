export interface UserType {
  name: string;
  level: number;
  hp: number;
  exp: number;
  mp: number;

  str: number;
  dex: number;
  luk: number;
  int: number;

  gold: number;
}

export type SkillTypes = "STR" | "DEX" | "LUK" | "INT";
