import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-details-result',
  templateUrl: './account-details-result.component.html',
  styleUrls: ['./account-details-result.component.css']
})
export class AccountDetailsResultComponent implements OnInit {

  private pagination = { pageSize: 20, lowerRange: 0, upperRange: 0, disableNext: false, disablePrevious: false, searchResultSetSize: 0 };
  private filter = { accountName: String, parentAccount: String, leadSource: String, emailId: String, contactNo: String };
  private accountInfos;
  private searchResult: Array<any>;
  private filteredResult: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.searchResult = [
  {
    "accountName": "Widget Corp",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@widgetcorp.com",
	"contactNo": "9227898700"
  },
  {
    "accountName": "Galaxy Corp",
	"parentAccount": "LexCorp",
	"leadSource": "Partner",
	"emailId": "info.contact@galaxycorp.com",
	"contactNo": "4117898907"
  },
  {
    "accountName": "Wayne Enterprises",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@wayneent.com",
	"contactNo": "9138078987"
  },
  {
    "accountName": "LexCorp",
	"parentAccount": "",
	"leadSource": "Partner",
	"emailId": "info.contact@lexcorp.com",
	"contactNo": "9137788987"
  },
  {
    "accountName": "Thatherton Fuels",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@thatherton.com",
	"contactNo": "2219878987"
  },
  {
    "accountName": "Mooby Corp",
	"parentAccount": "LexCorp",
	"leadSource": "Web",
	"emailId": "info.contact@moobycorp.com",
	"contactNo": "9137118987"
  },
  {
    "accountName": "Universal Export",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@uniexp.com",
	"contactNo": "9137893387"
  },
  {
    "accountName": "Colonial Movers",
	"parentAccount": "Wayne Enterprises",
	"leadSource": "Public Relations",
	"emailId": "info.contact@colonmov.com",
	"contactNo": "9137348987"
  },
  {
    "accountName": "General Services Corporation",
	"parentAccount": "",
	"leadSource": "Seminar Partner",
	"emailId": "info.contact@genservcorp.com",
	"contactNo": "9136678987"
  },
  {
    "accountName": "Axis Chemical Co.",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@axischem.com",
	"contactNo": "9137118987"
  },
  {
    "accountName": "Vandelay Industries",
	"parentAccount": "Wayne Enterprises",
	"leadSource": "Web",
	"emailId": "info.contact@vandindus.com",
	"contactNo": "9137844987"
  },
  {
    "accountName": "SpringShield",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@springshld.com",
	"contactNo": "9137890987"
  },
  {
    "accountName": "Acme Corp",
	"parentAccount": "LuthorCorp",
	"leadSource": "Seminar Partner",
	"emailId": "info.contact@acmecorp.com",
	"contactNo": "9137832987"
  },
  {
    "accountName": "LuthorCorp",
	"parentAccount": "",
	"leadSource": "Web",
	"emailId": "info.contact@luthrcorp.com",
	"contactNo": "9137778987"
  },
  {
    "accountName": "ZiffCorp",
	"parentAccount": "",
	"leadSource": "External Referal",
	"emailId": "info.contact@ziffcorp.com",
	"contactNo": "9137898755"
  },
  {
    "accountName": "Thrift Bank",
	"parentAccount": "ZiffCorp",
	"leadSource": "External Referal",
	"emailId": "info.contact@thriftbnk.com",
	"contactNo": "9137898227"
  },
  {
    "accountName": "Demo, inc.",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@demoinc.com",
	"contactNo": "9137866987"
  },
  {
    "accountName": "Praxis Corporation",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@praxis.com",
	"contactNo": "9132278987"
  },
  {
    "accountName": "Mammoth Pictures",
	"parentAccount": "Praxis Corporation",
	"leadSource": "Public Relations",
	"emailId": "info.contact@mammoth.com",
	"contactNo": "8911878987"
  },
  {
    "accountName": "Kumatsu Motors",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@kumatsumot.com",
	"contactNo": "9137890087"
  }
];

this.filteredResult = [
  {
    "accountName": "Widget Corp",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@widgetcorp.com",
	"contactNo": "9227898700"
  },
  {
    "accountName": "Galaxy Corp",
	"parentAccount": "LexCorp",
	"leadSource": "Partner",
	"emailId": "info.contact@galaxycorp.com",
	"contactNo": "4117898907"
  },
  {
    "accountName": "Wayne Enterprises",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@wayneent.com",
	"contactNo": "9138078987"
  },
  {
    "accountName": "LexCorp",
	"parentAccount": "",
	"leadSource": "Partner",
	"emailId": "info.contact@lexcorp.com",
	"contactNo": "9137788987"
  },
  {
    "accountName": "Thatherton Fuels",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@thatherton.com",
	"contactNo": "2219878987"
  },
  {
    "accountName": "Mooby Corp",
	"parentAccount": "LexCorp",
	"leadSource": "Web",
	"emailId": "info.contact@moobycorp.com",
	"contactNo": "9137118987"
  },
  {
    "accountName": "Universal Export",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@uniexp.com",
	"contactNo": "9137893387"
  },
  {
    "accountName": "Colonial Movers",
	"parentAccount": "Wayne Enterprises",
	"leadSource": "Public Relations",
	"emailId": "info.contact@colonmov.com",
	"contactNo": "9137348987"
  },
  {
    "accountName": "General Services Corporation",
	"parentAccount": "",
	"leadSource": "Seminar Partner",
	"emailId": "info.contact@genservcorp.com",
	"contactNo": "9136678987"
  },
  {
    "accountName": "Axis Chemical Co.",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@axischem.com",
	"contactNo": "9137118987"
  },
  {
    "accountName": "Vandelay Industries",
	"parentAccount": "Wayne Enterprises",
	"leadSource": "Web",
	"emailId": "info.contact@vandindus.com",
	"contactNo": "9137844987"
  },
  {
    "accountName": "SpringShield",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@springshld.com",
	"contactNo": "9137890987"
  },
  {
    "accountName": "Acme Corp",
	"parentAccount": "LuthorCorp",
	"leadSource": "Seminar Partner",
	"emailId": "info.contact@acmecorp.com",
	"contactNo": "9137832987"
  },
  {
    "accountName": "LuthorCorp",
	"parentAccount": "",
	"leadSource": "Web",
	"emailId": "info.contact@luthrcorp.com",
	"contactNo": "9137778987"
  },
  {
    "accountName": "ZiffCorp",
	"parentAccount": "",
	"leadSource": "External Referal",
	"emailId": "info.contact@ziffcorp.com",
	"contactNo": "9137898755"
  },
  {
    "accountName": "Thrift Bank",
	"parentAccount": "ZiffCorp",
	"leadSource": "External Referal",
	"emailId": "info.contact@thriftbnk.com",
	"contactNo": "9137898227"
  },
  {
    "accountName": "Demo, inc.",
	"parentAccount": "",
	"leadSource": "Public Relations",
	"emailId": "info.contact@demoinc.com",
	"contactNo": "9137866987"
  },
  {
    "accountName": "Praxis Corporation",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@praxis.com",
	"contactNo": "9132278987"
  },
  {
    "accountName": "Mammoth Pictures",
	"parentAccount": "Praxis Corporation",
	"leadSource": "Public Relations",
	"emailId": "info.contact@mammoth.com",
	"contactNo": "8911878987"
  },
  {
    "accountName": "Kumatsu Motors",
	"parentAccount": "",
	"leadSource": "Advertisement",
	"emailId": "info.contact@kumatsumot.com",
	"contactNo": "9137890087"
  }
];
this.goToFirstPage(this.filteredResult);

  }


  filterAccount($event, fieldName) {
    if (fieldName === "accountName")
      this.filter.accountName = $event.target.value;
    if (fieldName === "parentAccount")
      this.filter.parentAccount = $event.target.value;
    if (fieldName === "leadSource")
      this.filter.leadSource = $event.target.value;
    if (fieldName === "emailId")
      this.filter.emailId = $event.target.value;
    if (fieldName === "contactNo")
      this.filter.contactNo = $event.target.value;
    let filteredAccount: Array<any> = new Array();



    for (let account of this.searchResult) {
      if ((!!this.filter.accountName && (new String(account.accountName)).toUpperCase().indexOf(this.filter.accountName.toString().toUpperCase()) > -1)
        || (!!this.filter.parentAccount && (new String(account.parentAccount)).toUpperCase().indexOf(this.filter.parentAccount.toString().toUpperCase()) > -1)
        || (!!this.filter.leadSource && (new String(account.leadSource)).toUpperCase().indexOf(this.filter.leadSource.toString().toUpperCase()) > -1)
        || (!!this.filter.emailId && (new String(account.emailId)).toUpperCase().indexOf(this.filter.emailId.toString().toUpperCase()) > -1)
        || (!!this.filter.contactNo && (new String(account.contactNo)).toUpperCase().indexOf(this.filter.contactNo.toString().toUpperCase()) > -1)
      ) {
        filteredAccount.push(account);
      }
      else if (!$event.target.value) {
        filteredAccount.push(account);
      }
    }
    this.filteredResult = filteredAccount;
    this.goToFirstPage(this.filteredResult)
  }

  goToFirstPage(filteredResult) {
    this.pagination.lowerRange = filteredResult.length === 0 ? 0 : 1;
    if (filteredResult.length >= this.pagination.pageSize) {
      this.accountInfos = this.filteredResult.slice(0, this.pagination.pageSize);
      this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
      this.pagination.disableNext = false;
      this.pagination.disablePrevious = true;
    }
    else {
      this.accountInfos = this.filteredResult;
      this.pagination.upperRange = this.filteredResult.length;
      this.pagination.disableNext = true;
      this.pagination.disablePrevious = true;
    }
    this.pagination.searchResultSetSize = this.filteredResult.length;
  }

  next() {
    if (this.pagination.disableNext)
      return;
    this.pagination.lowerRange = this.pagination.lowerRange + this.pagination.pageSize;
    this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
    this.pagination.disablePrevious = false;
    if (this.pagination.upperRange >= this.pagination.searchResultSetSize) {
      this.pagination.upperRange = this.pagination.searchResultSetSize;
      this.pagination.disableNext = true;
    }
    this.accountInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
  }

  previous() {
    if (this.pagination.disablePrevious)
      return;
    this.pagination.lowerRange = this.pagination.lowerRange - this.pagination.pageSize;
    this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
    this.pagination.disableNext = false;
    if (this.pagination.lowerRange <= 1) {
      this.pagination.lowerRange = 1;
      this.pagination.disablePrevious = true;
    }
    this.accountInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
  }

  backToSearchCriteria() {
    this.router.navigate(['accountDetails']);
  }

}
