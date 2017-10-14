import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ContactService } from '../contact.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-app-dashboard',
  templateUrl: './app-dashboard.component.html',
  styleUrls: ['./app-dashboard.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-50%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-50%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class AppDashboardComponent implements OnInit {

  private search = 'simple';
  private appDashboardSearchFormGroup: FormGroup;
  private accountQuadruples;
  private message = '';
  private searchString;
  private startAccount = 0
  private pageSizeAccount = 6;
  private paginationMessageAccount;
  private contactQuadruples;
  private startContact = 0
  private pageSizeContact = 6;
  private paginationMessageContact;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, 
    private contactService: ContactService) { }

  ngOnInit() {
    this.appDashboardSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.appDashboardSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.message = '';
          this.accountQuadruples = undefined;
        } else {
          this.startAccount = 0;
          this.searchString = res;
          this.accountService.searchAccounts(this.searchString, 0)
            .subscribe(
            data => {
              this.message = '';
              this.accountQuadruples = this.getAccountQuadruples(data);
            },
            err => {
              this.message = err.json()["message"];
            });

          this.startContact = 0;
          this.searchString = res;
          this.contactService.searchContacts(this.searchString, 0)
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

  getAccountQuadruples(accounts) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= accounts.length; i++) {
      triple.push(accounts[i - 1]);
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

  nextAccount() {
    this.startAccount = this.startAccount + this.pageSizeAccount;
    this.accountService.searchAccounts(this.searchString, this.startAccount)
      .subscribe(
      data => {
        this.message = '';
        this.accountQuadruples = this.getAccountQuadruples(data);
        this.paginationMessageAccount = undefined;
      },
      err => {
        this.startAccount = this.startAccount - this.pageSizeAccount;
        if (err.status === 404) {
          this.paginationMessageAccount = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessageAccount);
              this.paginationMessage = undefined;
            }.bind(this), 2000);
        }
      });
  }

  previousAccount() {
    if (this.startAccount === 0) {
      this.paginationMessageAccount = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessageAccount);
          this.paginationMessage = undefined;
        }.bind(this), 2000);
    } else {
      this.startAccount = this.startAccount - this.pageSizeAccount;
      this.accountService.searchAccounts(this.searchString, this.startAccount)
        .subscribe(
        data => {
          this.message = '';
          this.accountQuadruples = this.getAccountQuadruples(data);
          this.paginationMessageAccount = undefined;
        },
        err => {
          this.startAccount = this.startAccount + this.pageSizeAccount;
        });
    }
  }

  nextContact() {
    this.startContact = this.startContact + this.pageSizeContact;
    this.contactService.searchContacts(this.searchString, this.startContact)
      .subscribe(
      data => {
        this.message = '';
        this.contactQuadruples = this.getContactQuadruples(data);
        this.paginationMessageContact = undefined;
      },
      err => {
        this.startContact = this.startContact - this.pageSizeContact;
        if (err.status === 404) {
          this.paginationMessageContact = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessageContact);
              this.paginationMessage = undefined;
            }.bind(this), 2000);
        }
      });
  }

  previousContact() {
    if (this.startContact === 0) {
      this.paginationMessageContact = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessageContact);
          this.paginationMessage = undefined;
        }.bind(this), 2000);
    } else {
      this.startContact = this.startContact - this.pageSizeContact;
      this.contactService.searchContacts(this.searchString, this.startContact)
        .subscribe(
        data => {
          this.message = '';
          this.contactQuadruples = this.getContactQuadruples(data);
          this.paginationMessageContact = undefined;
        },
        err => {
          this.startContact = this.startContact + this.pageSizeContact;
        });
    }
  }

}
