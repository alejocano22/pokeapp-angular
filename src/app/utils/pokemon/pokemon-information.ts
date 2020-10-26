import { PokemonListItem } from 'src/app/modules/pokemon/models/pokemon-list-item';

export class PokemonInformation {
  constructor(){ }

  static getFavoriteListIndex(favoritePokemonList: PokemonListItem[], pokemonName: string): number  {
    return favoritePokemonList.findIndex((pokemon) => pokemon.name === pokemonName);
  }

  static isFavorite(favoritePokemonList: PokemonListItem[], pokemon: PokemonListItem): boolean {
    return this.getFavoriteListIndex(favoritePokemonList, pokemon.name) !== -1;
  }

  static getGender(rate: number): string {
    let gender = 'Genderless';
    if (rate >= 4 ){
        gender = 'Female';
    } else if (rate >= 0){
        gender = 'Male';
    }
    return gender;
  }

}
