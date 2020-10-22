import { addFavoritePokemon, deleteFavoritePokemon } from './../../actions/pokemon.actions';
import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../reducers';
import { updateComparisonPokemon, updateCurrentPokemon } from '../../actions/pokemon.actions';
import { PokemonListEntityService } from '../../services/pokemon-list-entity.service';
import { PokemonCardEntityService } from '../../services/pokemon-card-entity.service';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { getPokemonImageUrl } from 'src/app/utils/images/pokemon-images';
import { speciesApi } from 'src/app/utils/url/pokeapi';
import { defaultDialogConfig } from 'src/app/utils/dialog/default-dialog-config';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  @Input() pokemonList: PokemonListItem[];
  @Input() favoritePokemonList: PokemonListItem[];
  @Input() currentPokemon: PokemonListItem;
  @Input() isComparing: boolean;
  @Input() searchInput: string;
  maxFavoriteMessage = 'You can only have 5 favorite pokemon!';
  comparisonMessage = 'Comparing pokemon...';
  nextOffset = 20;
  maxFavorite: boolean;

  constructor(private courseService: PokemonListEntityService,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>,
              private dialog: MatDialog) { }

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
      speciesUrl: speciesApi + pokemon.name
    });

    if (this.isComparing) {
      this.store.dispatch(updateComparisonPokemon({ pokemon }));
    } else {
      this.store.dispatch(updateCurrentPokemon({ pokemon }));
    }

    const dialogConfig = defaultDialogConfig();
    this.dialog.open(PokemonCardComponent, dialogConfig);
  }

  getImage(name: string): string{
    const id = this.pokemonList.findIndex((pokemon) => pokemon.name === name) + 1;
    return getPokemonImageUrl(id);
  }

  onScroll(): void{
    this.loadMorePokemon();
  }

  handleFavorite(event: any, pokemon: PokemonListItem): void{
    this.maxFavorite = false;
    if (this.getFavoriteListIndex(pokemon.name) === -1){
      if (this.favoritePokemonList.length > 4){
        this.maxFavorite = true;
      } else {
        this.store.dispatch(addFavoritePokemon({ pokemon }));
      }
    } else {
      this.store.dispatch(deleteFavoritePokemon({ pokemon }));
    }
    event.stopPropagation();
  }

  getFavoriteListIndex(pokemonName: string): number {
    return this.favoritePokemonList.findIndex((pokemon) => pokemon.name === pokemonName);
  }

}
