import { Component, Input, OnInit } from '@angular/core';
import { PokemonListItem } from 'src/app/modules/pokemon/models/pokemon-list-item';
import { getPokemonImageUrl } from 'src/app/utils/images/pokemon-images';

@Component({
  selector: 'app-favorite-pokemon-banner',
  templateUrl: './favorite-pokemon-banner.component.html',
  styleUrls: ['./favorite-pokemon-banner.component.css']
})
export class FavoritePokemonBannerComponent implements OnInit {
  @Input() favoritePokemonList: PokemonListItem[];
  pokemonImages: string[];

  constructor() { }

  ngOnInit(): void {
    this.pokemonImages = this.favoritePokemonList.map((pokemon) => this.getImage(pokemon.url));
  }

  getImage(url: string): string {
    return getPokemonImageUrl(parseInt(url.split('/')[6], 10));
  }
}
