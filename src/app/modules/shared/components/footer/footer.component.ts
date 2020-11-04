import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @Input() footerMessage?: string;
  defaultMessage = 'PokéApp | @alejocano22 HTML Template | All Rights Reserved.';

  constructor() { }
}
