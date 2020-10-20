import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PokemonState } from '../../reducers';
import { compare } from '../../actions/pokemon.actions';
import { getComparisonPokemon, getCurrentPokemon, getIsComparing } from '../../selectors/pokemon.selectors';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  currentPokemon$: Observable<PokemonListItem>;
  comparisonPokemon$: Observable<PokemonListItem>;
  isComparing$: Observable<boolean>;
  compareFlag: boolean;
  isComparing: boolean;

  constructor(public dialogRef: MatDialogRef<PokemonCardComponent>,
              private store: Store<PokemonState>) { }

  ngOnInit(): void {
    this.compareFlag = true;
    this.isComparing$ = this.store.pipe(select(getIsComparing));
    this.isComparing$.subscribe(isComparing => {
      if (this.compareFlag){
        this.isComparing = isComparing;
        this.compareFlag = false;
      }
    });

    this.currentPokemon$ = this.store.pipe(select(getCurrentPokemon));
    this.comparisonPokemon$ = this.store.pipe(select(getComparisonPokemon));
  }

  ngOnDestroy(): void {
    if (this.isComparing){
      this.store.dispatch(compare());
    }
  }
}
