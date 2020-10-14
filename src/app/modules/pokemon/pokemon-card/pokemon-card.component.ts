import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';

@Component({
  selector: 'app-pokemon-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.css']
})
export class PokemonCardComponent implements OnInit {
  pokemon: PokemonListItem;
  mode: string;
  dialogTitle: string;

  id: number;
  pokemonInfo$: Observable<Pokemon[]>;

  constructor(private dialogRef: MatDialogRef<PokemonCardComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private pokemonCardService: PokemonCardEntityService) {
    this.dialogTitle = data.dialogTitle;
    this.pokemon = data.pokemon;

    this.pokemonInfo$ = this.pokemonCardService.entities$
      .pipe(
        map(pokemons => pokemons.filter(pokemon => pokemon.name === this.pokemon.name))
      );
    this.load();
  }

  load(): void{
    // console.log(this.pokemonInfo$.subscribe());
  }

  showMode(): void {
    console.log(this.mode);
  }

  compare(): void {
    this.mode = 'compare';
  }

  onClose(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // this.pokemonCardService.getAll();
  }

}
