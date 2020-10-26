import { Component, Input } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { PokemonInformation } from 'src/app/utils/pokemon/pokemon-information';
import { PokemonResources } from 'src/app/utils/pokemon/pokemon-resources';

@Component({
  selector: 'app-pokemon-card-data',
  templateUrl: './pokemon-card-data.component.html',
  styleUrls: ['./pokemon-card-data.component.css', 'pokemon-comparison-card-data.component.css']
})
export class PokemonCardDataComponent {
  @Input() currentPokemon: Pokemon;
  @Input() comparisonPokemon: Pokemon;
  @Input() isComparing: boolean;
  pokemonDetailTitle = ['Height', 'Weight'];

  constructor() { }

  getImage(id: number): string{
    return PokemonResources.getPokemonImageUrl(id);
  }

  getItem(id: number): string{
    const items: string[] = ['height', 'weight'];
    return items[id];
  }

  getGenderName(rate: number): string{
    return PokemonInformation.getGender(rate);
  }
}
