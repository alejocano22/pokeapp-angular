import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PokemonState } from '../reducers/index';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemonListState');

export const getIsComparing = createSelector(
  selectPokemonState,
  (state) => !!state.isComparing
);

export const getCurrentPokemon = createSelector(
  selectPokemonState,
  (state) => state.currentPokemon
);

export const getComparisonPokemon = createSelector(
  selectPokemonState,
  (state) => state.comparisonPokemon
);

export const getSearchInput = createSelector(
  selectPokemonState,
  (state) => state.search
);

export const getFavoritePokemonList = createSelector(
  selectPokemonState,
  (state) => state.favoritePokemonList
);

