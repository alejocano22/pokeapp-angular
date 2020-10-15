import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonListItem } from '../models/pokemon-list-item';
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

  constructor(private dialogRef: MatDialogRef<PokemonCardComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private pokemonCardService: PokemonCardEntityService) {
    this.dialogTitle = data.dialogTitle;
    this.pokemon = data.pokemon;
  }

  compare(): void {
    this.mode = 'compare';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
