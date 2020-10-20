import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';


export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [HomeComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes),

  ]
})
export class HomeModule { }
