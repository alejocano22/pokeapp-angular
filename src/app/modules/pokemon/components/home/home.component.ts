import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getComparisonPokemon, getCurrentPokemon, getFavoritePokemonList, getIsComparing, getSearchInput } from '../../selectors/pokemon.selectors';
import { PokemonState } from '../../reducers';
import { PokemonListEntityService } from '../../services/pokemon-list-entity.service';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { updateSearchInput } from '../../actions/pokemon.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  pokemonList$: Observable<PokemonListItem[]>;
  favoritePokemonList$: Observable<PokemonListItem[]>;
  currentPokemon$: Observable<PokemonListItem>;
  comparisonPokemon$: Observable<PokemonListItem>;
  isComparing$: Observable<boolean>;
  searchInput$: Observable<string>;

  constructor(private pokemonListService: PokemonListEntityService,
              private store: Store<PokemonState>) { }

  ngOnInit(): void {
    this.updateFilter();
    this.pokemonList$ = this.pokemonListService.filteredEntities$;
    this.favoritePokemonList$ = this.store.select(getFavoritePokemonList);
    this.currentPokemon$ = this.store.pipe(select(getCurrentPokemon));
    this.comparisonPokemon$ = this.store.pipe(select(getComparisonPokemon));
    this.isComparing$ = this.store.pipe(select(getIsComparing));
    this.searchInput$ = this.store.pipe(select(getSearchInput));
  }

  updateFilter(search: string = ''): void {
    this.pokemonListService.setFilter(search);
    this.store.dispatch(updateSearchInput({ search }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(updateSearchInput({ search: '' }));
  }
}
