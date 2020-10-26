import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { AlertMessageComponent } from './components/alert-message/alert-message.component';
import { InfoMessageComponent } from './components/info-message/info-message.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitleComponent } from './components/title/title.component';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [
    AlertMessageComponent,
    InfoMessageComponent,
    FooterComponent,
    TitleComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
  ],
  exports: [
    AlertMessageComponent,
    InfoMessageComponent,
    FooterComponent,
    TitleComponent,
    SearchComponent
  ]
})
export class SharedModule { }
