import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../reducers';
import { updateComparisonPokemon, updateCurrentPokemon } from '../../actions/pokemon.actions';
import { PokemonListEntityService } from '../../services/pokemon-list-entity.service';
import { PokemonCardEntityService } from '../../services/pokemon-card-entity.service';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { PokemonResources } from 'src/app/utils/pokemon/pokemon-resources';
import { environment } from 'src/environments/environment';
import { PokemonDialog } from 'src/app/utils/dialog/pokemon-dialog';
import { MatDialog } from '@angular/material/dialog';
import { PokemonInformation } from 'src/app/utils/pokemon/pokemon-information';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent {
  @Input()
  get pokemonList(): PokemonListItem[] {
    return this.pokemonListItems;
  }

  set pokemonList(pokemonList: PokemonListItem[]){
    this.pokemonImages = pokemonList.map((pokemon) => this.getImage(pokemon.url));
    this.pokemonListItems = pokemonList;
  }

  @Input() favoritePokemonList: PokemonListItem[];
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() isComparing: boolean;
  @Input() searchInput: string;
  private pokemonListItems: PokemonListItem[];
  pokemonImages: string[] = [];
  nextOffset = 20;
  isFavoriteListFull = false;

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
      speciesUrl: environment.speciesApi + pokemon.name
    });

    if (this.isComparing) {
      this.comparisonPokemon = pokemon;
      this.store.dispatch(updateComparisonPokemon({ pokemon }));
    } else {
      this.currentPokemon = pokemon;
      this.store.dispatch(updateCurrentPokemon({ pokemon }));
    }

    const dialogConfig = PokemonDialog.defaultDialogConfig();
    dialogConfig.data = {
      isComparing: this.isComparing,
      currentPokemon: this.currentPokemon,
      comparisonPokemon: this.comparisonPokemon,
      favoritePokemonList: this.favoritePokemonList
    };
    this.dialog.open(PokemonCardComponent, dialogConfig);
  }

  getImage(url: string): string {
    return PokemonResources.getPokemonImageUrl(parseInt(url.split('/')[6], 10));
  }

  isFavorite(pokemon: PokemonListItem): boolean{
    return PokemonInformation.isFavorite(this.favoritePokemonList, pokemon);
  }

  handleIsFavoriteFull(isFavoriteListFull: boolean): void{
    this.isFavoriteListFull = isFavoriteListFull;
  }
}


