import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonState } from '../../reducers';
import { compare } from '../../actions/pokemon.actions';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonCardEntityService } from '../../services/pokemon-card-entity.service';
import { map } from 'rxjs/operators';
import { Pokemon } from '../../models/pokemon';
import { PokemonDialogData } from '../../models/pokemon-dialog-data';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  isComparing: boolean;
  currentPokemon: PokemonListItem;
  comparisonPokemon: PokemonListItem;
  favoritePokemonList: PokemonListItem[];
  currentPokemonInformation$: Observable<Pokemon>;
  comparisonPokemonInformation$: Observable<Pokemon>;

  constructor(public dialogRef: MatDialogRef<PokemonCardComponent>,
              @Inject(MAT_DIALOG_DATA) data: PokemonDialogData,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>) {
    this.isComparing = data.isComparing;
    this.currentPokemon = data.currentPokemon;
    this.comparisonPokemon = data.comparisonPokemon;
    this.favoritePokemonList = data.favoritePokemonList;
  }

  ngOnInit(): void {
    this.currentPokemonInformation$ = this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => pokemon.name === this.currentPokemon.name))
      );
    if (this.isComparing) {
      this.comparisonPokemonInformation$ = this.pokemonCardService.entities$
        .pipe(
          map((pokemonList) => pokemonList.find((pokemon) => pokemon.name === this.comparisonPokemon.name))
      );
    }
  }

  ngOnDestroy(): void {
    if (this.isComparing) {
      this.store.dispatch(compare());
    }
  }
}
