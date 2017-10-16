import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { OppService } from '../opp.service';
import { LeadService } from '../lead.service';
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
  private searchString;
  private accountQuadruples;
  private startAccount = 0
  private pageSizeAccount = 3;
  private paginationMessageAccount;
  private opportunityQuadruples;
  private startOpportunity = 0
  private pageSizeOpportunity = 3;
  private paginationMessageOpportunity;
  private leadQuadruples;
  private startLead = 0
  private pageSizeLead = 3;
  private paginationMessageLead;
  private contactQuadruples;
  private startContact = 0
  private pageSizeContact = 3;
  private paginationMessageContact;

  private accountTitle = '';
  private opportunityTitle = '';
  private leadTitle = '';
  private contactTitle = '';

  private accountCount = 0;
  private opportunityCount = 0;
  private leadCount = 0;
  private contactCount = 0;

  private errMessage;

  constructor(private formBuilder: FormBuilder, private accountService: AccountService, 
    private contactService: ContactService, private oppService: OppService,
    private leadService: LeadService) { }

  ngOnInit() {
    this.appDashboardSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.appDashboardSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.accountQuadruples = undefined;
          this.contactQuadruples = undefined;
          this.opportunityQuadruples = undefined;
          this.leadQuadruples = undefined;
        } else {
          this.startAccount = 0;
          this.searchString = res;
          this.accountService.searchAccounts(this.searchString, 0)
            .subscribe(
            data => {
              this.accountQuadruples = this.getAccountQuadruples(data);
              this.accountTitle = 'Accounts';
            },
            err => {
              this.accountQuadruples = undefined;
            });

          this.startOpportunity = 0;
          this.oppService.searchOpportunities(this.searchString, 0)
            .subscribe(
            data => {
              this.opportunityQuadruples = this.getOpportunityQuadruples(data);
              this.opportunityTitle = 'Opportunities';
            },
            err => {
              this.opportunityQuadruples = undefined;
            });

          this.startLead = 0;
          this.leadService.searchLeads(this.searchString, 0)
            .subscribe(
            data => {
              this.leadQuadruples = this.getLeadQuadruples(data);
              this.leadTitle = 'Leads';
            },
            err => {
              this.leadQuadruples = undefined;
            });

          this.startContact = 0;
          this.contactService.searchContacts(this.searchString, 0)
            .subscribe(
            data => {
              this.contactQuadruples = this.getContactQuadruples(data);
              this.contactTitle = 'Contacts';
            },
            err => {
              this.contactQuadruples = undefined;
            });
        }
      });

      this.contactService.getAllCount()
        .subscribe(
        res => {
          this.accountCount = res.accountCount;
          this.opportunityCount = res.opportunityCount;
          this.leadCount = res.leadCount;
          this.contactCount = res.contactCount;
        }
      );
  }

  getAccountQuadruples(accounts) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= accounts.length; i++) {
      triple.push(accounts[i - 1]);
      if (i % 3 === 0) {
        arr.push(triple);
        triple = [];
        break;
      }
    }
    if (triple.length > 0) {
      arr.push(triple);
    }
    return arr;
  }

  getOpportunityQuadruples(opportunitys) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= opportunitys.length; i++) {
      triple.push(opportunitys[i - 1]);
      if (i % 3 === 0) {
        arr.push(triple);
        triple = [];
        break;
      }
    }
    if (triple.length > 0) {
      arr.push(triple);
    }
    return arr;
  }

  getLeadQuadruples(leads) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= leads.length; i++) {
      triple.push(leads[i - 1]);
      if (i % 3 === 0) {
        arr.push(triple);
        triple = [];
        break;
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
        break;
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
              this.paginationMessageAccount = undefined;
            }.bind(this), 2000);
        } else {
          this.paginationMessageAccount = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageAccount = undefined;
            }.bind(this), 2000);

          this.paginationMessageAccount = this.paginationMessageAccount + " : " + err.json()["message"];
        }
      });
  }

  previousAccount() {
    if (this.startAccount === 0) {
      this.paginationMessageAccount = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessageAccount);
          this.paginationMessageAccount = undefined;
        }.bind(this), 2000);
    } else {
      this.startAccount = this.startAccount - this.pageSizeAccount;
      this.accountService.searchAccounts(this.searchString, this.startAccount)
        .subscribe(
        data => {
          this.accountQuadruples = this.getAccountQuadruples(data);
          this.paginationMessageAccount = undefined;
        },
        err => {
          this.startAccount = this.startAccount + this.pageSizeAccount;
          this.paginationMessageAccount = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageAccount = undefined;
            }.bind(this), 2000);

          this.paginationMessageAccount = this.paginationMessageAccount + " : " + err.json()["message"];
        });
    }
  }

  nextOpportunity() {
    this.startOpportunity = this.startOpportunity + this.pageSizeOpportunity;
    this.oppService.searchOpportunities(this.searchString, this.startOpportunity)
      .subscribe(
      data => {
        this.opportunityQuadruples = this.getOpportunityQuadruples(data);
        this.paginationMessageOpportunity = undefined;
      },
      err => {
        this.startOpportunity = this.startOpportunity - this.pageSizeOpportunity;
        if (err.status === 404) {
          this.paginationMessageOpportunity = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessageOpportunity);
              this.paginationMessageOpportunity = undefined;
            }.bind(this), 2000);
        } else {
          this.paginationMessageOpportunity = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageOpportunity = undefined;
            }.bind(this), 2000);

          this.paginationMessageOpportunity = this.paginationMessageOpportunity + " : " + err.json()["message"];
        }
      });
  }

  previousOpportunity() {
    if (this.startOpportunity === 0) {
      this.paginationMessageOpportunity = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessageOpportunity);
          this.paginationMessageOpportunity = undefined;
        }.bind(this), 2000);
    } else {
      this.startOpportunity = this.startOpportunity - this.pageSizeOpportunity;
      this.oppService.searchOpportunities(this.searchString, this.startOpportunity)
        .subscribe(
        data => {
          this.opportunityQuadruples = this.getOpportunityQuadruples(data);
          this.paginationMessageOpportunity = undefined;
        },
        err => {
          this.startOpportunity = this.startOpportunity + this.pageSizeOpportunity;
          this.paginationMessageOpportunity = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageOpportunity = undefined;
            }.bind(this), 2000);

          this.paginationMessageOpportunity = this.paginationMessageOpportunity + " : " + err.json()["message"];
        });
    }
  }

  nextLead() {
    this.startLead = this.startLead + this.pageSizeLead;
    this.leadService.searchLeads(this.searchString, this.startLead)
      .subscribe(
      data => {
        this.leadQuadruples = this.getLeadQuadruples(data);
        this.paginationMessageLead = undefined;
      },
      err => {
        this.startLead = this.startLead - this.pageSizeLead;
        if (err.status === 404) {
          this.paginationMessageLead = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessageLead);
              this.paginationMessageLead = undefined;
            }.bind(this), 2000);
        } else {
          this.paginationMessageLead = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageLead = undefined;
            }.bind(this), 2000);

          this.paginationMessageLead = this.paginationMessageLead + " : " + err.json()["message"];
        }
      });
  }

  previousLead() {
    if (this.startLead === 0) {
      this.paginationMessageLead = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessageLead);
          this.paginationMessageLead = undefined;
        }.bind(this), 2000);
    } else {
      this.startLead = this.startLead - this.pageSizeLead;
      this.leadService.searchLeads(this.searchString, this.startLead)
        .subscribe(
        data => {
          this.leadQuadruples = this.getLeadQuadruples(data);
          this.paginationMessageLead = undefined;
        },
        err => {
          this.startLead = this.startLead + this.pageSizeLead;
          this.paginationMessageLead = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageLead = undefined;
            }.bind(this), 2000);

          this.paginationMessageLead = this.paginationMessageLead + " : " + err.json()["message"];
       });
    }
  }

  nextContact() {
    this.startContact = this.startContact + this.pageSizeContact;
    this.contactService.searchContacts(this.searchString, this.startContact)
      .subscribe(
      data => {
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
              this.paginationMessageContact = undefined;
            }.bind(this), 2000);
        } else {
          this.paginationMessageContact = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageContact = undefined;
            }.bind(this), 2000);

          this.paginationMessageContact = this.paginationMessageContact + " : " + err.json()["message"];
        }
      });
  }

  previousContact() {
    if (this.startContact === 0) {
      this.paginationMessageContact = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessageContact);
          this.paginationMessageContact = undefined;
        }.bind(this), 2000);
    } else {
      this.startContact = this.startContact - this.pageSizeContact;
      this.contactService.searchContacts(this.searchString, this.startContact)
        .subscribe(
        data => {
          this.contactQuadruples = this.getContactQuadruples(data);
          this.paginationMessageContact = undefined;
        },
        err => {
          this.startContact = this.startContact + this.pageSizeContact;
          this.paginationMessageContact = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessageContact = undefined;
            }.bind(this), 2000);

          this.paginationMessageContact = this.paginationMessageContact + " : " + err.json()["message"];
        });
    }
  }

}
