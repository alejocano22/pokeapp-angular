import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { map } from 'rxjs/operators';
import { PokemonListItem } from '../models/pokemon-list-item';
import { environment } from 'src/environments/environment';

@Injectable()
export class PokemonListDataService extends DefaultDataService<PokemonListItem>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator){
    super('PokemonList', http, httpUrlGenerator);
  }

  getAll(): Observable<PokemonListItem[]>{
    return this.http.get(environment.pokemonApi)
      .pipe(
        map(res => res['results'])
      );
  }

  getWithQuery(params): Observable<PokemonListItem[]>{
    return this.http.get(`${environment.pokemonApi}?offset=${params.offset}&limit=${params.limit}`)
      .pipe(
        map(res => res['results'])
      );
  }
}
