import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map } from 'rxjs/operators';
import { PokemonListItem } from '../models/pokemon-list-item';
import { pokemonApi } from 'src/app/utils/url/pokeapi';

@Injectable()
export class PokemonListDataService extends DefaultDataService<PokemonListItem>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator){
    super('PokemonList', http, httpUrlGenerator);
  }

  getAll(): Observable<PokemonListItem[]>{
    return this.http.get(pokemonApi)
      .pipe(
        map(res => res['results'])
      );
  }

  getWithQuery(params): Observable<PokemonListItem[]>{
    return this.http.get(`${pokemonApi}?offset=${params.offset}&limit=${params.limit}`)
      .pipe(
        map(res => res['results'])
      );
  }
}
