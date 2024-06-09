export interface NPCType {
  key: string;
  name: string;
  description: string;
  personality: string;
  location: string;

  encountered: boolean;
  likeability: number;
}
