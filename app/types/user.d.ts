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
  title: {
    key: string;
    name: string;
    description: string;
  }[];
}

export type SkillTypes = "STR" | "DEX" | "LUK" | "INT";
