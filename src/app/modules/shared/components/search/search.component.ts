import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  @Output() inputChange = new EventEmitter<string>();

  constructor() { }

  updateInput(input: string): void {
    this.inputChange.emit(input);
  }
}
