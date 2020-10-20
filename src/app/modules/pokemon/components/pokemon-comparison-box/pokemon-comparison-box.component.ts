import { Component, Input } from '@angular/core';
import { PokemonListItem } from '../../models/pokemon-list-item';

@Component({
  selector: 'app-pokemon-comparison-box',
  templateUrl: './pokemon-comparison-box.component.html',
  styleUrls: ['./pokemon-comparison-box.component.css']
})
export class PokemonComparisonBoxComponent {
  @Input() isComparing: boolean;
  @Input() currentPokemon: PokemonListItem;

  constructor() { }
}
