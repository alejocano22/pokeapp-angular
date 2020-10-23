import { PokemonListItem } from './pokemon-list-item';

export interface DialogData {
  isComparing: boolean;
  currentPokemon: PokemonListItem;
  comparisonPokemon: PokemonListItem;
  favoritePokemonList: PokemonListItem[];
}
