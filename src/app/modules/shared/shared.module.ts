import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule, Routes } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';

export const headerRoutes: Routes = [
  {
    path: '',
    component: HeaderComponent,

  }
];

@NgModule({
  declarations: [ HeaderComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule.forChild(headerRoutes),

  ],
  exports: [HeaderComponent]
})
export class SharedModule { }
