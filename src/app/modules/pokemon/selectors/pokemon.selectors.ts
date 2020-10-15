import { PokemonState } from '../reducers/index';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPokemonState = createFeatureSelector<PokemonState>('pokemonListState');

export const isComparing = createSelector(
  selectPokemonState,
  (compare) => !!compare.isComparing
);

