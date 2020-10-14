import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonListEntityService } from '../services/pokemon-list-entity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private pokemonListService: PokemonListEntityService) { }

  pokemonList$: Observable<PokemonListItem[]>;

  ngOnInit(): void {
    this.reload();
  }

  reload(): void {
    this.pokemonList$ = this.pokemonListService.entities$.pipe(map(p => p));
  }

}
