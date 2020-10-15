import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PokemonListItem } from '../models/pokemon-list-item';
import { PokemonState } from '../reducers';
import { isComparing } from '../selectors/pokemon.selectors';
import { PokemonListEntityService } from '../services/pokemon-list-entity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private pokemonListService: PokemonListEntityService,
              private store: Store<PokemonState>) { }

  pokemonList$: Observable<PokemonListItem[]>;
  isComparing$: Observable<boolean>;

  ngOnInit(): void {
    this.isComparing$ = this.store.pipe(select(isComparing));
    this.reload();
  }

  reload(): void {
    this.pokemonList$ = this.pokemonListService.entities$.pipe(map(p => p));
  }

}
