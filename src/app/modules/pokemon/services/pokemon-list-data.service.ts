import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DefaultDataService, HttpUrlGenerator } from '@ngrx/data';
import { PokemonListItem } from '../models/pokemon-list-item';
import { map } from 'rxjs/operators';




@Injectable()
export class PokemonListDataService extends DefaultDataService<PokemonListItem>{
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator){
    super('PokemonList', http, httpUrlGenerator);
  }

  getAll(): Observable<PokemonListItem[]>{
    return this.http.get('https://pokeapi.co/api/v2/pokemon/')
      .pipe(
        map(res => res['results'])
      );
  }

  getWithQuery(params): Observable<PokemonListItem[]>{
    return this.http.get(`https://pokeapi.co/api/v2/pokemon/?offset=${params.offset}&limit=${params.limit}`)
      .pipe(
        map(res => res['results'])
      );
  }
}
