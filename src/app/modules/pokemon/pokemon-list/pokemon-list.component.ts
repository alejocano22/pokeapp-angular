import { updateComparisonPokemon, updateCurrentPokemon } from './../actions/pokemon.actions';

import { Component, OnInit, Input } from '@angular/core';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonListEntityService } from '../services/pokemon-list-entity.service';

import { defaultDialogConfig } from 'src/app/utils/dialog/default-dialog-config';
import { MatDialog } from '@angular/material/dialog';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../reducers';

import { getIsComparing } from '../selectors/pokemon.selectors';
import { take } from 'rxjs/operators';
import { getPokemonImageUrl } from 'src/app/utils/images/pokemon-images';

import { speciesApi } from 'src/app/utils/const/pokeapi';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Input() pokemonListItems: PokemonListItem[];
  nextOffset = 20;
  isComparing: boolean;

  constructor(private dialog: MatDialog, private courseService: PokemonListEntityService,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>) { }

  ngOnInit(): void {
  }

  loadMorePokemon(): void {
    this.courseService.getWithQuery({
      offset: this.nextOffset.toString(),
      limit: '20',
    });
    this.nextOffset  += 20;
  }

  async openPokemonCard(pokemon: PokemonListItem): Promise<void> {
    this.pokemonCardService.getWithQuery({
      url: pokemon.url,
      speciesUrl: speciesApi + pokemon.name
    });
    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      dialogTitle: pokemon.name,
      pokemon,
    };

    this.isComparing = await this.store.pipe(select(getIsComparing), take(1)).toPromise();
    if (this.isComparing){
      this.store.dispatch(updateComparisonPokemon({pokemon}));
    }else{
      this.store.dispatch(updateCurrentPokemon({pokemon}));
    }

    this.dialog.open(PokemonCardComponent, dialogConfig);
  }

  getImage(name: string): string{
    const id = this.pokemonListItems.findIndex((pokemon) => pokemon.name === name) + 1;
    return getPokemonImageUrl(id);
  }

}
