import { Component, OnInit, trigger, transition, style, animate, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss']
})
export class ContactSelectorComponent implements OnInit {

  private contactSearchFormGroup: FormGroup;
  private searchString;
  private contacts;

  @Output() add = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, 
              private contactService: ContactService) { }

  ngOnInit() {
    this.contactSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.contactSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.contacts = undefined;
        } else {
          this.searchString = res;
          this.contactService.searchContacts(this.searchString, 0)
            .subscribe(
            data => {
              this.contacts = data;
            },
            err => {
              
            });
        }
      });
  }

  addContact(contact) {
    let name = contact.fName + ' ' + (contact.mName?(contact.mName + ' '):'') + contact.lName;
    console.log(name);
    this.add.emit({
      "pubKey": contact.pubKey,
      "name": name
    });
  }
}
