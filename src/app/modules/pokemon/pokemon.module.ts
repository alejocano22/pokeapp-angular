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
import {MatIconModule} from '@angular/material/icon';

import { HomeComponent } from './home/home.component';
import { PokemonCardComponent } from './pokemon-card/pokemon-card.component';
import {MatDialogModule} from '@angular/material/dialog';
import { PokemonCardDataService } from './services/pokemon-card-data.service';
import { PokemonCardEntityService } from './services/pokemon-card-entity.service';
import { PokemonCardDataComponent } from './pokemon-card-data/pokemon-card-data.component';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from './reducers';
import { PokemonCardHeaderComponent } from './pokemon-card-header/pokemon-card-header.component';
import { PokemonComparisonBoxComponent } from './pokemon-comparison-box/pokemon-comparison-box.component';
import { ChartsModule } from 'ng2-charts';
import { PokemonCardChartComponent } from './pokemon-card-chart/pokemon-card-chart.component';

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
  declarations: [
    PokemonListComponent,
    HomeComponent,
    PokemonCardComponent,
    PokemonCardDataComponent,
    PokemonCardHeaderComponent,
    PokemonComparisonBoxComponent,
    PokemonCardChartComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    ChartsModule,
    RouterModule.forChild(pokemonListRoutes),
    StoreModule.forFeature('pokemonListState', pokemonReducer),
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
