import { PokemonListItem } from './../models/pokemon-list-item';
import { createAction, props } from '@ngrx/store';

export const compare = createAction(
  '[Pokemon Card] Compare Pokemon',
);

export const updateCurrentPokemon = createAction(
  '[Pokemon Card] Update Current Pokemon',
  props<{ pokemon: PokemonListItem }>()
);

export const updateComparisonPokemon = createAction(
  '[Pokemon Card] Update Comparison Pokemon',
  props<{ pokemon: PokemonListItem }>()
);

export const updateSearchInput = createAction(
  '[Search Input] Update Search Input',
  props<{ search: string }>()
);

export const addFavoritePokemon = createAction(
  '[List Of Pokemon] Add Favorite Pokemon',
  props<{ pokemon: PokemonListItem }>()
);

export const deleteFavoritePokemon = createAction(
  '[List Of Pokemon] Delete Favorite Pokemon',
  props<{ pokemon: PokemonListItem }>()
);
