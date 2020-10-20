import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../reducers';
import { updateSearchInput } from '../../actions/pokemon.actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  constructor(private store: Store<PokemonState>) { }

  onChange(event: any): void {
    const search: string = event.target.value;
    this.store.dispatch(updateSearchInput({search}));
  }
}
