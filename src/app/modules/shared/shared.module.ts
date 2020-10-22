import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';

@NgModule({
  declarations: [
    AlertMessageComponent,
    InfoMessageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    AlertMessageComponent,
    InfoMessageComponent
  ]
})
export class SharedModule { }
