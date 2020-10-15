import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { compare } from '../actions/pokemon.actions';
import { Pokemon } from '../models/pokemon';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonState } from '../reducers';
import { isComparing } from '../selectors/pokemon.selectors';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PokemonCardComponent implements OnInit, OnDestroy {
  pokemon: PokemonListItem;
  mode: string;
  dialogTitle: string;
  data: boolean;

  isComparing$: Observable<boolean>;

  constructor(private dialogRef: MatDialogRef<PokemonCardComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>) {
    this.dialogTitle = data.dialogTitle;
    this.pokemon = data.pokemon;
  }

  compare(): void {
    this.dialogRef.close();
    this.store.dispatch(compare());
  }

  onClose(): void {
    this.dialogRef.close();
  }

  async ngOnInit(): Promise<void> {
    this.isComparing$ = this.store.pipe(select(isComparing));
    this.data = await this.store.pipe(select(isComparing), take(1)).toPromise();
  }

  ngOnDestroy(): void {
    if (this.data === true){
      console.log('Ya compare y voy a volver a mostrar');
      this.store.dispatch(compare());
    }
    console.log('close card');
  }
}
