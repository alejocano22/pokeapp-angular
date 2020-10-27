import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { PokemonState } from '../../reducers';
import { compare } from '../../actions/pokemon.actions';
import { PokemonListItem } from '../../models/pokemon-list-item';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { MatDialogRef } from '@angular/material/dialog';
import { PokemonInformation } from 'src/app/utils/pokemon/pokemon-information';

@Component({
  selector: 'app-pokemon-card-header',
  templateUrl: './pokemon-card-header.component.html',
  styleUrls: ['./pokemon-card-header.component.css']
})
export class PokemonCardHeaderComponent {
  @Input()
  get favoritePokemonList(): PokemonListItem[] {
    return this.favoritePokemonListItems;
  }

  set favoritePokemonList(favoritePokemonList: PokemonListItem[]) {
    this.favoritePokemonListItems = favoritePokemonList;
    this.favorite = this.isFavorite(this.currentPokemon);
  }

  @Input() isComparing: boolean;
  @Input() currentPokemon: PokemonListItem;
  @Input() comparisonPokemon: PokemonListItem;
  @Input() dialogRef: MatDialogRef<PokemonCardComponent>;
  private favoritePokemonListItems: PokemonListItem[];
  favorite: boolean;

  constructor(private store: Store<PokemonState>) { }

  onClose(): void {
    this.dialogRef.close();
  }

  onCompare(): void {
    this.store.dispatch(compare());
    this.dialogRef.close();
  }

  isFavorite(pokemon: PokemonListItem): boolean{
    return PokemonInformation.isFavorite(this.favoritePokemonList, pokemon);
  }
}
