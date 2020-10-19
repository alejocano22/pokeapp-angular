import { Pokemon } from './../models/pokemon';
import { getComparisonPokemon, getCurrentPokemon } from './../selectors/pokemon.selectors';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { compare } from '../actions/pokemon.actions';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonState } from '../reducers';
import { getIsComparing } from '../selectors/pokemon.selectors';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';


@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  mode: string;
  dialogTitle: string;
  isComparing: boolean;

  isComparing$: Observable<boolean>;

  currentPokemon$: Observable<PokemonListItem>;
  comparisonPokemon$: Observable<PokemonListItem>;

  currentPokemonInformation$: Observable<Pokemon>;


  constructor(public dialogRef: MatDialogRef<PokemonCardComponent>,
              private store: Store<PokemonState>,
              private pokemonCardService: PokemonCardEntityService) {
  }

  async ngOnInit(): Promise<void> {
    this.isComparing$ = this.store.pipe(select(getIsComparing));
    this.currentPokemon$ = this.store.pipe(select(getCurrentPokemon));
    this.comparisonPokemon$ = this.store.pipe(select(getComparisonPokemon));
    this.isComparing = await this.store.pipe(select(getIsComparing), take(1)).toPromise();
  }

  ngOnDestroy(): void {
    if (this.isComparing){
      this.store.dispatch(compare());
    }
  }
}
