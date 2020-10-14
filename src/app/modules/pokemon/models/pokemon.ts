export interface Pokemon {
  id: number;
  name: string;
  height: string;
  weight: string;
  types: object[];
  abilities: object[];
  stats: object[];
  description: string;
  genderRate: number;
}
