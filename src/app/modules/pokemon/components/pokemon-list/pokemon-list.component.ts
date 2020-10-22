import { Observable, Subscription } from 'rxjs';
import { getFavoritePokemonList } from './../../selectors/pokemon.selectors';
import { addFavoritePokemon, deleteFavoritePokemon } from './../../actions/pokemon.actions';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { PokemonState } from '../../reducers';
import { updateComparisonPokemon, updateCurrentPokemon } from '../../actions/pokemon.actions';
import { getSearchInput, getIsComparing } from '../../selectors/pokemon.selectors';
import { PokemonListEntityService } from '../../services/pokemon-list-entity.service';
import { PokemonCardEntityService } from '../../services/pokemon-card-entity.service';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { getPokemonImageUrl } from 'src/app/utils/images/pokemon-images';
import { speciesApi } from 'src/app/utils/const/pokeapi';
import { defaultDialogConfig } from 'src/app/utils/dialog/default-dialog-config';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit, OnDestroy {
  @Input() pokemonListItems: PokemonListItem[];
  maxFavoriteMessage = 'You can only have 5 favorite pokemon!';
  favoritePokemonList$: Subscription;
  favoritePokemonList: PokemonListItem[];
  searchInput: string;
  isComparing: boolean;
  nextOffset = 20;
  maxFavorite: boolean;

  constructor(private courseService: PokemonListEntityService,
              private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.store.pipe(select(getSearchInput)).subscribe((searchInput) => this.searchInput = searchInput);
    this.favoritePokemonList$ = this.store.select(getFavoritePokemonList).subscribe(favoritePokemonList => {
      this.favoritePokemonList = favoritePokemonList;
    });
  }

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

    this.store.pipe(select(getIsComparing)).subscribe((isComparing) => this.isComparing = isComparing);
    if (this.isComparing) {
      this.store.dispatch(updateComparisonPokemon({ pokemon }));
    } else {
      this.store.dispatch(updateCurrentPokemon({ pokemon }));
    }

    const dialogConfig = defaultDialogConfig();
    this.dialog.open(PokemonCardComponent, dialogConfig);
  }

  getImage(name: string): string{
    const id = this.pokemonListItems.findIndex((pokemon) => pokemon.name === name) + 1;
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

  ngOnDestroy(): void {
    this.favoritePokemonList$.unsubscribe();
  }

}
