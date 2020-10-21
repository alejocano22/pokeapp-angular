import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonCardEntityService } from '../../services/pokemon-card-entity.service';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { Pokemon } from '../../models/pokemon';
import { getGender } from 'src/app/utils/pokemon/pokemon-gender';
import { getPokemonImageUrl } from 'src/app/utils/images/pokemon-images';

@Component({
  selector: 'app-pokemon-card-data',
  templateUrl: './pokemon-card-data.component.html',
  styleUrls: ['./pokemon-card-data.component.css', 'pokemon-comparison-card-data.component.css']
})
export class PokemonCardDataComponent implements OnInit {
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() isComparing: boolean;
  comparisonPokemonInfo$: Observable<Pokemon>;
  pokemonDetailTitle = ['Height', 'Weight'];

  currentPokemonInfo: Pokemon;
  comparisonPokemonInfo: Pokemon;

  constructor(private pokemonCardService: PokemonCardEntityService) { }

  ngOnInit(): void {
    this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => pokemon.name === this.currentPokemon.name))
      ).subscribe(pokemon => {
        if (pokemon) {
          this.currentPokemonInfo = pokemon;
        }
      });

    if (this.isComparing) {
      this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => pokemon.name === this.comparisonPokemon.name))
      ).subscribe(pokemon => {
        if (pokemon) {
          this.comparisonPokemonInfo = pokemon;
        }
      });
    }
  }

  getImage(id: number): string{
    return getPokemonImageUrl(id);
  }

  getItem(id: number): string{
    const items: string[] = ['weight', 'height'];
    return items[id];
  }

  getGenderName(rate: number): string{
    return getGender(rate);
  }
}
