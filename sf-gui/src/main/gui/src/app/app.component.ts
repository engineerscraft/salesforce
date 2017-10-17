import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Nectar Salesforce';

  constructor() {

  }

  getUserName() {
    return localStorage.getItem("userName");
  }

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    localStorage.removeItem("userName");
  }

}
