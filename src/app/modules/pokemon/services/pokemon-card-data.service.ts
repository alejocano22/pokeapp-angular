import { Pokemon } from './../models/pokemon';
import { combineLatest, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map } from 'rxjs/operators';


@Injectable()
export class PokemonCardDataService extends DefaultDataService<Pokemon>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator){
    super('Pokemon', http, httpUrlGenerator);
  }

  getWithQuery(params: any): Observable<Pokemon[]>{
    const pokemonArray = [];

    return combineLatest([this.http.get(params.url), this.http.get(params.speciesUrl)])
      .pipe(
        map(res =>  {
          const pokemonInfo = res[0];
          const speciesInfo = res[1];
          const pokemon: Pokemon = {
            name: pokemonInfo['name'],
            id: pokemonInfo['id'],
            height: pokemonInfo['height'],
            weight: pokemonInfo['weight'],
            types: pokemonInfo['types'],
            abilities: pokemonInfo['abilities'],
            stats: pokemonInfo['stats'],
            description: speciesInfo['flavor_text_entries'].filter((entry: any) => entry.language.name === 'en')[0].flavor_text,
            genderRate: speciesInfo['gender_rate']
          };
          pokemonArray.push(pokemon);
          return pokemonArray;
        })
    );
  }
}
