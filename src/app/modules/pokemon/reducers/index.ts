import {
  createReducer,
  on,
} from '@ngrx/store';
import { PokemonActions } from '../actions/action-types';

export interface PokemonState {
  isComparing: boolean;
}

export const initialAuthState: PokemonState = {
  isComparing: false,
};

export const pokemonReducer = createReducer(
  initialAuthState,
  on(PokemonActions.compare, (state, action) => {
    return {
      isComparing: !state.isComparing,
    };
  })
);
