import { Component, OnInit, trigger, transition, style, animate, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-contact-selector',
  templateUrl: './contact-selector.component.html',
  styleUrls: ['./contact-selector.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(-50%)', opacity: 0 }))
      ])
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(-50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class ContactSelectorComponent implements OnInit {

  private contactSearchFormGroup: FormGroup;
  private searchString;
  private contacts;
  private start = 0
  private pageSize = 6;
  private paginationMessage;
  private message = '';


  @Output() add = new EventEmitter<any>();
  @Input() addedContacts;

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
              this.contacts.forEach(function (con) {
                this.addedContacts.forEach(function (addedCon) {
                  if (con.pubKey === addedCon.pubKey) {
                    con.alreadyAdded = true;
                  }
                }.bind(this))
              }.bind(this));
            },
            err => {

            });
        }
      });
  }

  addContact(contact) {
    let name = contact.fName + ' ' + (contact.mName ? (contact.mName + ' ') : '') + contact.lName;
    this.add.emit({
      "pubKey": contact.pubKey,
      "name": name,
      "email": contact.email,
      "mob": contact.mob,
      "land": contact.land,
      "extn": contact.extn,
      "desig": contact.desig,
      "company": contact.company
    });
    this.contacts.forEach(function (con) {
      if (contact.pubKey === con.pubKey) {
        con.alreadyAdded = true;
      }
    });
  }

  next() {
    this.start = this.start + this.pageSize;
    this.contactService.searchContacts(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.contacts = data;
        this.paginationMessage = undefined;
        this.contacts.forEach(function (con) {
          this.addedContacts.forEach(function (addedCon) {
            if (con.pubKey === addedCon.pubKey) {
              con.alreadyAdded = true;
            }
          }.bind(this))
        }.bind(this));

      },
      err => {
        this.start = this.start - this.pageSize;
        if (err.status === 404) {
          this.paginationMessage = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessage);
              this.paginationMessage = undefined;
            }.bind(this), 2000);
        }
      });
  }

  previous() {
    if (this.start === 0) {
      this.paginationMessage = "You are on the first page";
      setTimeout(
        function () {
          this.paginationMessage = undefined;
        }.bind(this), 2000);
    } else {
      this.start = this.start - this.pageSize;
      this.contactService.searchContacts(this.searchString, this.start)
        .subscribe(
        data => {
          this.contacts = data;
          this.message = '';
          this.paginationMessage = undefined;
          this.contacts.forEach(function (con) {
            this.addedContacts.forEach(function (addedCon) {
              if (con.pubKey === addedCon.pubKey) {
                con.alreadyAdded = true;
              }
            }.bind(this))
          }.bind(this));
        },
        err => {
          this.start = this.start + this.pageSize;
        });
    }
  }

}
