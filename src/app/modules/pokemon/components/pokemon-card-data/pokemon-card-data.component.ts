import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonInformation } from 'src/app/utils/pokemon/pokemon-information';
import { PokemonResources } from 'src/app/utils/pokemon/pokemon-resources';

@Component({
  selector: 'app-pokemon-card-data',
  templateUrl: './pokemon-card-data.component.html',
  styleUrls: ['./pokemon-card-data.component.css', 'pokemon-comparison-card-data.component.css']
})
export class PokemonCardDataComponent {
  @Input()
  get currentPokemon(): Pokemon {
    return this.currentPokemonInformation;
  }

  set currentPokemon(currentPokemon: Pokemon){
    if (currentPokemon) {
      this.pokemonImages[0] = this.getImage(currentPokemon.id) ;
    }
    this.currentPokemonInformation = currentPokemon;
  }

  @Input()
  get comparisonPokemon(): Pokemon {
    return this.comparisonPokemonInformation;
  }

  set comparisonPokemon(comparisonPokemon: Pokemon){
    if (comparisonPokemon) {
      this.pokemonImages[1] = this.getImage(comparisonPokemon.id) ;
    }
    this.comparisonPokemonInformation = comparisonPokemon;
  }

  @Input() isComparing: boolean;
  private currentPokemonInformation: Pokemon;
  private comparisonPokemonInformation: Pokemon;
  pokemonImages: string[] = [];
  pokemonDetailTitle: string[] = ['Height', 'Weight'];

  constructor() { }

  getImage(id: number): string{
    return PokemonResources.getPokemonImageUrl(id);
  }

  getGenderName(rate: number): string{
    return PokemonInformation.getGender(rate);
  }
}
