import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-message',
  templateUrl: './info-message.component.html',
  styleUrls: ['./info-message.component.css']
})
export class InfoMessageComponent {
  @Input() mainMessage: string;
  @Input() message: string;

  constructor() { }
}
