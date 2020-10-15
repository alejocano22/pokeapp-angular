import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Pokemon } from '../models/pokemon';
import { PokemonCardEntityService } from '../services/pokemon-card-entity.service';
import { imagesUrl } from '../../../utils/const/images';
import { Store } from '@ngrx/store';
import { PokemonState } from '../reducers';

@Component({
  selector: 'app-pokemon-card-data',
  templateUrl: './pokemon-card-data.component.html',
  styleUrls: ['./pokemon-card-data.component.css']
})
export class PokemonCardDataComponent implements OnInit {

  @Input() pokemon: Pokemon;
  @Input() isComparing: boolean;
  pokemonInfo$: Observable<Pokemon>;
  loading$: Observable<boolean>;

  constructor(private pokemonCardService: PokemonCardEntityService,
              private store: Store<PokemonState>) { }

  async ngOnInit(): Promise<void> {
    if (this.isComparing === true){
      console.log('Estoy en data y se que debo comparar');
    } else {
      console.log('Estoy en data y se que debo mostrar');
    }
    this.pokemonInfo$ = this.pokemonCardService.entities$
      .pipe(
        map((pokemonList) => pokemonList.find((pokemon) => pokemon.name === this.pokemon.name))
      );
    this.loading$ = this.pokemonCardService.loading$.pipe(delay(0));
  }

  imgUrl(id: number): string{
    return imagesUrl + id.toString() + '.png?raw=true';
  }
}
