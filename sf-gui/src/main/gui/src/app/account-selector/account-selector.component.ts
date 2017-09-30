import { Component, OnInit, trigger, transition, style, animate, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-account-selector',
  templateUrl: './account-selector.component.html',
  styleUrls: ['./account-selector.component.scss'],
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
export class AccountSelectorComponent implements OnInit {

  private accountSearchFormGroup: FormGroup;
  private searchString;
  private accounts;
  private start = 0
  private pageSize = 6;
  private paginationMessage;
  private message = '';


  @Output() attach = new EventEmitter<any>();
  @Input() attachedaccount;

  constructor(private formBuilder: FormBuilder,
    private accountService: AccountService) { }

  ngOnInit() {
    this.accountSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.accountSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.accounts = undefined;
        } else {
          this.searchString = res;
          this.accountService.searchAccounts(this.searchString, 0)
            .subscribe(
            data => {
              this.accounts = data;
              this.accounts.forEach(function (acc) {
                  if (this.attachedaccount.pubKey === acc.pubKey) {
                    acc.alreadyAttached = true;
                  }
              }.bind(this));
            },
            err => {

            });
        }
      });
  }

  attachAccount(account) {
    this.attach.emit({
      "pubKey": account.pubKey,
      "title": account.title
    });
    this.accounts.forEach(function (acc) {
      if (account.pubKey === acc.pubKey) {
        acc.alreadyAttached = true;
      } else {
        acc.alreadyAttached = false;
      }
    });
  }

  next() {
    this.start = this.start + this.pageSize;
    this.accountService.searchAccounts(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.accounts = data;
        this.paginationMessage = undefined;
        this.accounts.forEach(function (acc) {
            if (acc.pubKey === this.attachedAccount.pubKey) {
              acc.alreadyAttached = true;
            }
        }.bind(this));

      },
      err => {
        this.start = this.start - this.pageSize;
        if (err.status === 404) {
          this.paginationMessage = "You are on the last page";
          setTimeout(
            function () {
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
      this.accountService.searchAccounts(this.searchString, this.start)
        .subscribe(
        data => {
          this.accounts = data;
          this.message = '';
          this.paginationMessage = undefined;
          this.accounts.forEach(function (acc) {
              if (acc.pubKey === this.attachedAccount.pubKey) {
                acc.alreadyAttached = true;
              }
          }.bind(this));
        },
        err => {
          this.start = this.start + this.pageSize;
        });
    }
  }

}