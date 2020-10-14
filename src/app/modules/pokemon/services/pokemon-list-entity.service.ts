import { Injectable } from '@angular/core';
import { EntityCollectionServiceBase, EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { PokemonListItem } from '../models/pokemon-list-item';

@Injectable()
export class PokemonListEntityService extends EntityCollectionServiceBase<PokemonListItem> {
  constructor(serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PokemonList', serviceElementsFactory);
  }

}
