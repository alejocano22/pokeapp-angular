import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonState } from '../../reducers';
import { compare } from '../../actions/pokemon.actions';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pokemon } from '../../models/pokemon';
import { PokemonDialogData } from '../../models/pokemon-dialog-data';
import { selectPokemonByName } from '../../selectors/pokemon.selectors';

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
              private store: Store<PokemonState>) {
    this.isComparing = data.isComparing;
    this.currentPokemon = data.currentPokemon;
    this.comparisonPokemon = data.comparisonPokemon;
    this.favoritePokemonList = data.favoritePokemonList;
  }

  ngOnInit(): void {
    this.currentPokemonInformation$ = this.store.select(selectPokemonByName, { pokemonName: this.currentPokemon.name });
    if (this.isComparing) {
      this.comparisonPokemonInformation$ = this.store.select(selectPokemonByName, { pokemonName: this.comparisonPokemon.name });
    }
  }

  ngOnDestroy(): void {
    if (this.isComparing) {
      this.store.dispatch(compare());
    }
  }
}
