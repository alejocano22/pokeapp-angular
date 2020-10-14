import { PokemonListItem } from './models/pokemon-list-item';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterModule, Routes } from '@angular/router';
import { EntityDataService, EntityDefinitionService, EntityMetadataMap } from '@ngrx/data';

import { PokemonListDataService } from './services/pokemon-list-data.service';
import { PokemonListEntityService } from './services/pokemon-list-entity.service';
import { PokemonListResolver } from './services/pokemon-list.resolver';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PokemonCardDataService } from './services/pokemon-card-data.service';
import { PokemonCardEntityService } from './services/pokemon-card-entity.service';
import { PokemonCardDataComponent } from './pokemon-card-data/pokemon-card-data.component';

export const pokemonListRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: {
      pokemonListItems: PokemonListResolver
    }

  }
];

const entityMetadata: EntityMetadataMap = {
  PokemonList: {
    selectId: (item: PokemonListItem) => item.name
  },
  Pokemon: { }
};

@NgModule({
  declarations: [PokemonListComponent, HomeComponent, PokemonCardComponent, PokemonCardDataComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    RouterModule.forChild(pokemonListRoutes)
  ],
  providers: [
    PokemonListEntityService,
    PokemonListDataService,
    PokemonCardEntityService,
    PokemonCardDataService,
    PokemonListResolver
  ]
})
export class PokemonModule {
  constructor(private eds: EntityDefinitionService,
              private entityDataService: EntityDataService,
              private pokemonListDataService: PokemonListDataService,
              private pokemonCardDataService: PokemonCardDataService) {

    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('PokemonList', pokemonListDataService);
    entityDataService.registerService('Pokemon', pokemonCardDataService);
  }
}
