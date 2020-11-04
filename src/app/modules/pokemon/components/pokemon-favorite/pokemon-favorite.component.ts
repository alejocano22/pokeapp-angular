import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { addFavoritePokemon, deleteFavoritePokemon } from '../../actions/pokemon.actions';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { PokemonState } from '../../reducers';

@Component({
  selector: 'app-pokemon-favorite',
  templateUrl: './pokemon-favorite.component.html',
  styleUrls: ['./pokemon-favorite.component.css']
})
export class PokemonFavoriteComponent {
  @Input() pokemon: PokemonListItem;
  @Input() favorite: boolean;
  @Input() favoritePokemonLength: number;
  @Input() bigSize: boolean;
  @Output() isFavoriteListFull = new EventEmitter<boolean>();
  maxFavoritePokemon = 5;

  constructor(private store: Store<PokemonState>) { }

  handleFavorite(event: MouseEvent): void {
    if (this.favorite) {
        this.store.dispatch(deleteFavoritePokemon({ pokemon: this.pokemon }));
        this.isFavoriteListFull.emit(false);
        this.favorite = false;
    } else {
      if (this.favoritePokemonLength < this.maxFavoritePokemon) {
        this.store.dispatch(addFavoritePokemon({ pokemon: this.pokemon }));
        this.favorite = true;
      } else {
        this.isFavoriteListFull.emit(true);
      }
    }
    event.stopPropagation();
  }
}
