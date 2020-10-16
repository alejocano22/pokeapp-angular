import { getGender } from './../../../utils/pokemon/pokemon-gender';
import { Component, Input, OnInit } from '@angular/core';
import { async, combineLatest, forkJoin, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';

import { select, Store } from '@ngrx/store';
import { PokemonState } from '../reducers';
import { PokemonListItem } from '../models/pokemon-list-item';

import { getPokemonImageUrl } from '../../../utils/images/pokemon-images';



@Component({
  selector: 'app-pokemon-card-data',
  templateUrl: './pokemon-card-data.component.html',
  styleUrls: ['./pokemon-card-data.component.css']
})
export class PokemonCardDataComponent implements OnInit {
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() isComparing: boolean;
  currentPokemonInfo$: Observable<Pokemon>;
  comparisonPokemonInfo$: Observable<Pokemon>;
  pokemonDetailTitle = ['Height', 'Weight'];


  constructor(private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>) {

              }

  async ngOnInit(): Promise<void> {



    this.currentPokemonInfo$ = this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => {
          return pokemon.name === this.currentPokemon.name;
        }))
      );
    if (this.isComparing){
      this.comparisonPokemonInfo$ = this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => {
          return pokemon.name === this.comparisonPokemon.name;
        }))
      );
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
