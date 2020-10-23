export interface Pokemon {
  id: number;
  name: string;
  height: string;
  weight: string;
  abilities: [{
    ability: {
      name: string,
      url: string
    },
    is_hidden: boolean,
    slot: number
  }];
  stats: [{
    base_stat: number,
    effort: number,
    stat: {
      name: string,
      url: string
    }
  }];
  types: [{
    slot: number,
    type: {
      name: string,
      url: string
    }
  }];
  description: string;
  genderRate: number;
}
