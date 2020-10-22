import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';

@NgModule({
  declarations: [ AlertMessageComponent],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [ AlertMessageComponent]
})
export class SharedModule { }
