import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home-page/home-page.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
  }
];

@NgModule({
  declarations: [HomeComponent, NotFoundPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(coursesRoutes)
  ]
})
export class HomeModule { }
