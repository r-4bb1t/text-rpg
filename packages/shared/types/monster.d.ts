export interface MonsterType {
  name: string;
  description: string;
  longDescription: string;
  personality: string;
  place: string;

  level: number;
  hp: number;
  maxHp: number;
  encountered: boolean;

  gold: number;
}
