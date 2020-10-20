import { Pipe, PipeTransform } from '@angular/core';
import { PokemonListItem } from './../models/pokemon-list-item';

@Pipe({ name: 'pokemonFilter' })
export class PokemonFilterPipe implements PipeTransform {

  transform(pokemonList: PokemonListItem[], searchInput: string): PokemonListItem[] {
    if (!pokemonList) {
      return [];
    }
    if (!searchInput) {
      return pokemonList;
    }
    searchInput = searchInput.toLocaleLowerCase();
    return pokemonList.filter(pokemon => {
      return pokemon.name.toLocaleLowerCase().includes(searchInput);
    });
  }
}
