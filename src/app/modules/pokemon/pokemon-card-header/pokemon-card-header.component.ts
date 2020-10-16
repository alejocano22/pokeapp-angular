import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialogRef } from '@angular/material/dialog';
import { compare } from '../actions/pokemon.actions';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonState } from '../reducers';

@Component({
  selector: 'app-pokemon-card-header',
  templateUrl: './pokemon-card-header.component.html',
  styleUrls: ['./pokemon-card-header.component.css']
})
export class PokemonCardHeaderComponent {
  @Input() isComparing: boolean;
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() dialogRef: MatDialogRef<PokemonCardComponent>;

  constructor(private store: Store<PokemonState>) { }

  onClose(): void {
    this.dialogRef.close();
  }

  onCompare(): void {
    this.dialogRef.close();
    this.store.dispatch(compare());
  }
}
