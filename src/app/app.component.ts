import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testproject';
  current:number=0;
  switchCaseNumber(number:number)
  {
    this.current=number;
  }
}
