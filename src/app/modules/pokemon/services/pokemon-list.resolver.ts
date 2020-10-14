import { PokemonListEntityService } from './pokemon-list-entity.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap, filter, first } from 'rxjs/operators';
@Injectable()
export class PokemonListResolver implements Resolve<boolean> {
  constructor(private pokemonListService: PokemonListEntityService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>{
    console.log('In resolver');
    return this.pokemonListService.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.pokemonListService.getAll();
        }
      }),
      filter(loaded => !!loaded),
      first()
    );
  }

}
