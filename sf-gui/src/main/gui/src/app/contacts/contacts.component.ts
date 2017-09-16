import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  private search = 'simple';

  constructor() { }

  ngOnInit() {
  }

  toggleSearch() {
    if(this.search === 'simple') {
      this.search = 'advanced';
    }
    else {
      this.search = 'simple';
    }
  }
}
