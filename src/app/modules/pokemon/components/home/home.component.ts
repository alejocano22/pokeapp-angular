import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { getComparisonPokemon, getCurrentPokemon, getFavoritePokemonList, getIsComparing } from '../../selectors/pokemon.selectors';
import { PokemonState } from '../../reducers';
import { PokemonListEntityService } from '../../services/pokemon-list-entity.service';
import { PokemonListItem } from '../../models/pokemon-list-item';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private pokemonListService: PokemonListEntityService,
              private store: Store<PokemonState>) { }
  pokemonList$: Observable<PokemonListItem[]>;
  favoritePokemonList$: Observable<PokemonListItem[]>;
  currentPokemon$: Observable<PokemonListItem>;
  comparisonPokemon$: Observable<PokemonListItem>;
  isComparing$: Observable<boolean>;

  ngOnInit(): void {
    this.updateFilter();
    this.pokemonList$ = this.pokemonListService.filteredEntities$;
    this.favoritePokemonList$ = this.store.select(getFavoritePokemonList);
    this.currentPokemon$ = this.store.select(getCurrentPokemon);
    this.comparisonPokemon$ = this.store.select(getComparisonPokemon);
    this.isComparing$ = this.store.select(getIsComparing);
  }

  updateFilter(search: string = ''): void {
    this.pokemonListService.setFilter(search);
  }
}
