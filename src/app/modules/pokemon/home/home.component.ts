import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { getCurrentPokemon, getIsComparing } from './../selectors/pokemon.selectors';
import { PokemonState } from '../reducers';
import { PokemonListEntityService } from '../services/pokemon-list-entity.service';
import { PokemonListItem } from '../models/pokemon-list-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private pokemonListService: PokemonListEntityService, private store: Store<PokemonState>) { }

  pokemonList$: Observable<PokemonListItem[]>;
  currentPokemon$: Observable<PokemonListItem>;
  isComparing$: Observable<boolean>;

  ngOnInit(): void {
    this.isComparing$ = this.store.pipe(select(getIsComparing));
    this.currentPokemon$ = this.store.pipe(select(getCurrentPokemon));
    this.reload();
  }

  reload(): void {
    this.pokemonList$ = this.pokemonListService.entities$.pipe(map(pokemon => pokemon));
  }

}
