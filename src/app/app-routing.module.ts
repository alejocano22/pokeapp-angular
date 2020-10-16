import { NotFoundPageComponent } from './modules/home/not-found-page/not-found-page.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/home/home.module').then(module => module.HomeModule)
  },
  {
    path: 'pokemon',
    loadChildren: () => import('./modules/pokemon/pokemon.module').then(module => module.PokemonModule)
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
