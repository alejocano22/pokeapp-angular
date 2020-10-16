import { updateComparisonPokemon } from './../actions/pokemon.actions';
import { PokemonListItem } from './../models/pokemon-list-item';
import {
  createReducer,
  on,
} from '@ngrx/store';
import { PokemonActions } from '../actions/action-types';
import { act } from '@ngrx/effects';

export interface PokemonState {
  isComparing: boolean;
  currentPokemon: PokemonListItem;
  comparisonPokemon: PokemonListItem;
}

export const initialAuthState: PokemonState = {
  isComparing: false,
  currentPokemon: undefined,
  comparisonPokemon: undefined,
};

export const pokemonReducer = createReducer(
  initialAuthState,
  on(PokemonActions.compare, (state, action) => {
    return {
      ...state,
      isComparing: !state.isComparing,
    };
  }),
  on(PokemonActions.updateCurrentPokemon, (state, action) => {
    return {
      ...state,
      currentPokemon: action.pokemon
    };
  }),
  on(PokemonActions.updateComparisonPokemon, (state, action) => {
    return {
      ...state,
      comparisonPokemon: action.pokemon
    };
  })
);
