export interface NPCType {
  key: string;
  name: string;
  description: string;
  personality: string;
  place: string;

  encountered: boolean;
  likeability: number;
}
