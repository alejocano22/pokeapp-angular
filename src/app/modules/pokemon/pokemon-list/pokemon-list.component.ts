import { combineLatest, Observable } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonListEntityService } from '../services/pokemon-list-entity.service';

import { defaultDialogConfig } from '../../../utils/dialog/default-dialog-config';
import { MatDialog } from '@angular/material/dialog';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../reducers';

import { isComparing } from '../selectors/pokemon.selectors';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Input() pokemonListItems: PokemonListItem[];
  nextOffset = 20;



  constructor(private dialog: MatDialog, private courseService: PokemonListEntityService,
              private pokemonCardService: PokemonCardEntityService,
              ) { }

  ngOnInit(): void {
  }

  getId(name: string): string {
    const id = this.pokemonListItems.findIndex(x => x.name === name) + 1;
    const url = 'https://github.com/PokeAPI/sprites/blob/146c91287ad01f6e15315bbd733fd7442c91fe6d/sprites/pokemon/';
    return url + id + '.png?raw=true' ;
  }

  loadMorePokemon(): void {
    this.courseService.getWithQuery({
      offset: this.nextOffset.toString(),
      limit: '20',
    });
    this.nextOffset  += 20;
  }

  openPokemonCard(pokemon: PokemonListItem): void {
    this.pokemonCardService.getWithQuery({
      url: pokemon.url,
      speciesUrl: 'https://pokeapi.co/api/v2/pokemon-species/' + pokemon.name
    });
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: pokemon.name,
      pokemon,
      mode: 'show'
    };
    this.dialog.open(PokemonCardComponent, dialogConfig);
  }

}
