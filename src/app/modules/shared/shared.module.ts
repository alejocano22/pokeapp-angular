import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AlertMessageComponent,
    InfoMessageComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    AlertMessageComponent,
    InfoMessageComponent,
    FooterComponent
  ]
})
export class SharedModule { }
