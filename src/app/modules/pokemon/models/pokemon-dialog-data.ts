import { PokemonListItem } from './pokemon-list-item';

export interface PokemonDialogData {
  isComparing: boolean;
  currentPokemon: PokemonListItem;
  comparisonPokemon: PokemonListItem;
  favoritePokemonList: PokemonListItem[];
}
