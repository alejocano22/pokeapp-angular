import { Component, OnInit, Input } from '@angular/core';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonListEntityService } from '../services/pokemon-list-entity.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  @Input()
  pokemonListItems: PokemonListItem[];

  constructor(private courseService: PokemonListEntityService) { }

  ngOnInit(): void {
  }

  getId(name: string): string {
    const id = this.pokemonListItems.findIndex(x => x.name === name) + 1;
    const url = 'https://github.com/PokeAPI/sprites/blob/146c91287ad01f6e15315bbd733fd7442c91fe6d/sprites/pokemon/';
    return url + id + '.png?raw=true' ;
  }

}
