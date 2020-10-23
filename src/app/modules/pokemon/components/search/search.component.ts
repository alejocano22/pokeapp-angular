import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../reducers';
import { updateSearchInput } from '../../actions/pokemon.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnDestroy{

  constructor(private store: Store<PokemonState>) { }

  updateSearch(search: string): void {
    this.store.dispatch(updateSearchInput({ search }));
  }

  ngOnDestroy(): void {
    this.store.dispatch(updateSearchInput({ search: '' }));
  }

}
