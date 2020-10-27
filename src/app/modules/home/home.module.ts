import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { pokemonReducer } from '../pokemon/reducers';
import { HomeComponent } from './components/home-page/home-page.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { FavoritePokemonBannerComponent } from './components/favorite-pokemon-banner/favorite-pokemon-banner.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { SharedModule } from '../shared/shared.module';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [
    HomeComponent,
    NotFoundPageComponent,
    FavoritePokemonBannerComponent
  ],
  imports: [
    CommonModule,
    IvyCarouselModule,
    SharedModule,
    RouterModule.forChild(homeRoutes),
    StoreModule.forFeature('pokemonListState', pokemonReducer),
  ]
})
export class HomeModule { }
