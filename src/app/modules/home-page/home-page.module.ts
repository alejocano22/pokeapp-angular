import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';


export const coursesRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,

  }
];

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(coursesRoutes)
  ]
})
export class HomePageModule { }
