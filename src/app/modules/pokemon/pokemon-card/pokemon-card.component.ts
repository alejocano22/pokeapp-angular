import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
export class PokemonCardComponent implements OnInit {
  pokemon: PokemonListItem;
  mode: string;
  dialogTitle: string;

  isComparing$: Observable<boolean>;

  constructor(private dialogRef: MatDialogRef<PokemonCardComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>) {
    this.dialogTitle = data.dialogTitle;
    this.pokemon = data.pokemon;
    this.mode = data.mode;
  }

  compare(): void {
    this.mode = 'compare';
    this.store.dispatch(compare());
    this.dialogRef.close();
    console.log(this.isComparing$);
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.isComparing$ = this.store.pipe(select(isComparing));
    console.log('on init card');
  }

}
