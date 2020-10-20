import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { SharedModule } from '../shared/shared.module';


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
