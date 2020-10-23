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
import { favorite } from 'src/app/utils/pokemon/pokemon-favorite';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {

  constructor(private courseService: PokemonListEntityService,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>,
              private dialog: MatDialog) { }
  @Input() pokemonList: PokemonListItem[];
  @Input() favoritePokemonList: PokemonListItem[];
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() isComparing: boolean;
  @Input() searchInput: string;
  maxFavoriteMessage = 'You can only have 5 favorite pokemon!';
  comparisonMessage = 'Comparing pokemon...';
  nextOffset = 20;
  isFavoriteListFull = false;

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
      this.comparisonPokemon = pokemon;
      this.store.dispatch(updateComparisonPokemon({ pokemon }));
    } else {
      this.currentPokemon = pokemon;
      this.store.dispatch(updateCurrentPokemon({ pokemon }));
    }

    const dialogConfig = defaultDialogConfig();
    dialogConfig.data = {
      isComparing: this.isComparing,
      currentPokemon: this.currentPokemon,
      comparisonPokemon: this.comparisonPokemon,
      favoritePokemonList: this.favoritePokemonList
    };
    this.dialog.open(PokemonCardComponent, dialogConfig);
  }

  getImage(name: string): string{
    const id = this.pokemonList.findIndex((pokemon) => pokemon.name === name) + 1;
    return getPokemonImageUrl(id);
  }

  onScroll(): void{
    this.loadMorePokemon();
  }

  isFavorite(pokemon: PokemonListItem): boolean{
    return favorite(this.favoritePokemonList, pokemon);
  }

  handleIsFavoriteFull(isFavoriteListFull: boolean): void{
    this.isFavoriteListFull = isFavoriteListFull;
  }
}


