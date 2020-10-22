import { createReducer, on } from '@ngrx/store';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonActions } from '../actions/action-types';

export interface PokemonState {
  isComparing: boolean;
  currentPokemon: PokemonListItem;
  comparisonPokemon: PokemonListItem;
  search: string;
  favoritePokemonList: PokemonListItem[];
}

export const initialAuthState: PokemonState = {
  isComparing: false,
  currentPokemon: undefined,
  comparisonPokemon: undefined,
  search: '',
  favoritePokemonList: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
    { name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
  ]
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
  }),
  on(PokemonActions.updateSearchInput, (state, action) => {
    return {
      ...state,
      search: action.search
    };
  }),
  on(PokemonActions.addFavoritePokemon, (state, action) => {
    return {
      ...state,
      favoritePokemonList: [...state.favoritePokemonList, action.pokemon]
    };
  }),
  on(PokemonActions.deleteFavoritePokemon, (state, action) => {
    return {
      ...state,
      favoritePokemonList: [...state.favoritePokemonList.filter((pokemon) => !(pokemon.name === action.pokemon.name))]
    };
  })
);
