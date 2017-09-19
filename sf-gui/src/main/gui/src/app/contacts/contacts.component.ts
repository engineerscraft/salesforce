import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  private search = 'simple';
  private contactSearchFormGroup: FormGroup;
  private contactQuadruples;
  private message = '';


  constructor(private formBuilder: FormBuilder, private contactService: ContactService) { }

  ngOnInit() {
    this.contactSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.contactSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.message = '';
          this.contactQuadruples = undefined;
        } else {

          this.contactService.searchContacts(res, 0)
            .subscribe(
            data => {
              this.message = '';
              this.contactQuadruples = this.getContactQuadruples(data);
            },
            err => {
              this.message = err.json()["message"];
            });
        }
      });

  }

  getContactQuadruples(contacts) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= contacts.length; i++) {
      triple.push(contacts[i - 1]);
      if (i % 3 === 0) {
        arr.push(triple);
        triple = [];
      }
    }
    if (triple.length > 0) {
      arr.push(triple);
    }
    return arr;
  }

  toggleSearch() {
    if (this.search === 'simple') {
      this.search = 'advanced';
    }
    else {
      this.search = 'simple';
    }
  }
}
