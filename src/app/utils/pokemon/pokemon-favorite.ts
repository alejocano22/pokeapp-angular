import { PokemonListItem } from 'src/app/modules/pokemon/models/pokemon-list-item';

const getFavoriteListIndex = (favoritePokemonList: PokemonListItem[], pokemonName: string): number => {
  return favoritePokemonList.findIndex((pokemon) => pokemon.name === pokemonName);
};

export const favorite = (favoritePokemonList: PokemonListItem[], pokemon: PokemonListItem): boolean => {
  return getFavoriteListIndex(favoritePokemonList, pokemon.name) !== -1;
};
