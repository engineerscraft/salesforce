import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lead-details-result',
  templateUrl: './lead-details-result.component.html',
  styleUrls: ['./lead-details-result.component.css']
})
export class LeadDetailsResultComponent implements OnInit {

  private pagination = { pageSize: 20, lowerRange: 0, upperRange: 0, disableNext: false, disablePrevious: false, searchResultSetSize: 0 };
  private filter = { firstName: String, lastName: String, company: String, emailId: String, contactNo: String };
  private leadInfos;
  private searchResult: Array<any>;
  private filteredResult: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {

    this.searchResult = [
  {
    "firstName": "John",
	"lastName": "Mathews",
	"company": "ABC Ltd",
	"emailId": "john.mathews@abc.com",
	"contactNo": "8987898700"
  },
  {
    "firstName": "Rik",
	"lastName": "Dey",
	"company": "ABC Ltd",
	"emailId": "rik.dey@abc.com",
	"contactNo": "8987898907"
  },
  {
    "firstName": "Rishi",
	"lastName": "Roy",
	"company": "ABC Ltd",
	"emailId": "rishi.roy@abc.com",
	"contactNo": "8988078987"
  },
  {
    "firstName": "Arun",
	"lastName": "Bose",
	"company": "XYZ Info Ltd",
	"emailId": "arun.bose@xyz.com",
	"contactNo": "8987788987"
  },
  {
    "firstName": "Abhishek",
	"lastName": "Banerjee",
	"company": "ABC Ltd",
	"emailId": "abhi.ban@abc.com",
	"contactNo": "8009878987"
  },
  {
    "firstName": "Sohini",
	"lastName": "Das",
	"company": "XYZ Info Ltd",
	"emailId": "sohini.das@xyz.com",
	"contactNo": "8987118987"
  },
  {
    "firstName": "Ratul",
	"lastName": "Dutta",
	"company": "Energetic Solutions",
	"emailId": "ratul.dutta@energeticsol.com",
	"contactNo": "8987893387"
  },
  {
    "firstName": "Vishal",
	"lastName": "Sharma",
	"company": "ABC Ltd",
	"emailId": "vishal.sharma@abc.com",
	"contactNo": "8987348987"
  },
  {
    "firstName": "Nitin",
	"lastName": "Dubey",
	"company": "Energetic Solutions",
	"emailId": "nitin.dubey@energeticsol.com",
	"contactNo": "8986678987"
  },
  {
    "firstName": "Barun",
	"lastName": "Biswas",
	"company": "Agarwal Ltd",
	"emailId": "barun.biswas@agarwal.com",
	"contactNo": "8987118987"
  },
  {
    "firstName": "Shitesh",
	"lastName": "Roy",
	"company": "Agarwal Ltd",
	"emailId": "shitesh.roy@agarwal.com",
	"contactNo": "8987844987"
  },
  {
    "firstName": "Andrew",
	"lastName": "Jones",
	"company": "XYZ Info Ltd",
	"emailId": "andrew.jones@xyz.com",
	"contactNo": "8987890987"
  },
  {
    "firstName": "Dhiren",
	"lastName": "Basu",
	"company": "Energetic Solutions",
	"emailId": "john.mathews@energeticsol.com",
	"contactNo": "8987832987"
  },
  {
    "firstName": "Bibhas",
	"lastName": "Dalal",
	"company": "Agarwal Ltd",
	"emailId": "bibhas.dalal@agarwal.com",
	"contactNo": "8987778987"
  },
  {
    "firstName": "Nilima",
	"lastName": "Sen",
	"company": "XYZ Info Ltd",
	"emailId": "nil.sen@xyz.com",
	"contactNo": "8987898755"
  },
  {
    "firstName": "Bruno",
	"lastName": "Lobo",
	"company": "Hitech Solutions",
	"emailId": "bruno.lobo@hitech.com",
	"contactNo": "8987898227"
  },
  {
    "firstName": "Karan",
	"lastName": "Ray",
	"company": "Hitech Solutions",
	"emailId": "karan.ray@hitech.com",
	"contactNo": "8987866987"
  },
  {
    "firstName": "Dhritiman",
	"lastName": "Bose",
	"company": "Hitech Solutions",
	"emailId": "dhriti.bose@hitech.com",
	"contactNo": "8982278987"
  },
  {
    "firstName": "Sneha",
	"lastName": "Kiran",
	"company": "Dastur Ltd",
	"emailId": "john.mathews@dastur.com",
	"contactNo": "8911878987"
  },
  {
    "firstName": "Sayan",
	"lastName": "Mukherjee",
	"company": "Dastur Ltd",
	"emailId": "sayan.mukherjee@dastur.com",
	"contactNo": "8987890087"
  }
];
this.filteredResult = [
  {
    "firstName": "John",
	"lastName": "Mathews",
	"company": "ABC Ltd",
	"emailId": "john.mathews@abc.com",
	"contactNo": "8987898700"
  },
  {
    "firstName": "Rik",
	"lastName": "Dey",
	"company": "ABC Ltd",
	"emailId": "rik.dey@abc.com",
	"contactNo": "8987898907"
  },
  {
    "firstName": "Rishi",
	"lastName": "Roy",
	"company": "ABC Ltd",
	"emailId": "rishi.roy@abc.com",
	"contactNo": "8988078987"
  },
  {
    "firstName": "Arun",
	"lastName": "Bose",
	"company": "XYZ Info Ltd",
	"emailId": "arun.bose@xyz.com",
	"contactNo": "8987788987"
  },
  {
    "firstName": "Abhishek",
	"lastName": "Banerjee",
	"company": "ABC Ltd",
	"emailId": "abhi.ban@abc.com",
	"contactNo": "8009878987"
  },
  {
    "firstName": "Sohini",
	"lastName": "Das",
	"company": "XYZ Info Ltd",
	"emailId": "sohini.das@xyz.com",
	"contactNo": "8987118987"
  },
  {
    "firstName": "Ratul",
	"lastName": "Dutta",
	"company": "Energetic Solutions",
	"emailId": "ratul.dutta@energeticsol.com",
	"contactNo": "8987893387"
  },
  {
    "firstName": "Vishal",
	"lastName": "Sharma",
	"company": "ABC Ltd",
	"emailId": "vishal.sharma@abc.com",
	"contactNo": "8987348987"
  },
  {
    "firstName": "Nitin",
	"lastName": "Dubey",
	"company": "Energetic Solutions",
	"emailId": "nitin.dubey@energeticsol.com",
	"contactNo": "8986678987"
  },
  {
    "firstName": "Barun",
	"lastName": "Biswas",
	"company": "Agarwal Ltd",
	"emailId": "barun.biswas@agarwal.com",
	"contactNo": "8987118987"
  },
  {
    "firstName": "Shitesh",
	"lastName": "Roy",
	"company": "Agarwal Ltd",
	"emailId": "shitesh.roy@agarwal.com",
	"contactNo": "8987844987"
  },
  {
    "firstName": "Andrew",
	"lastName": "Jones",
	"company": "XYZ Info Ltd",
	"emailId": "andrew.jones@xyz.com",
	"contactNo": "8987890987"
  },
  {
    "firstName": "Dhiren",
	"lastName": "Basu",
	"company": "Energetic Solutions",
	"emailId": "john.mathews@energeticsol.com",
	"contactNo": "8987832987"
  },
  {
    "firstName": "Bibhas",
	"lastName": "Dalal",
	"company": "Agarwal Ltd",
	"emailId": "bibhas.dalal@agarwal.com",
	"contactNo": "8987778987"
  },
  {
    "firstName": "Nilima",
	"lastName": "Sen",
	"company": "XYZ Info Ltd",
	"emailId": "nil.sen@xyz.com",
	"contactNo": "8987898755"
  },
  {
    "firstName": "Bruno",
	"lastName": "Lobo",
	"company": "Hitech Solutions",
	"emailId": "bruno.lobo@hitech.com",
	"contactNo": "8987898227"
  },
  {
    "firstName": "Karan",
	"lastName": "Ray",
	"company": "Hitech Solutions",
	"emailId": "karan.ray@hitech.com",
	"contactNo": "8987866987"
  },
  {
    "firstName": "Dhritiman",
	"lastName": "Bose",
	"company": "Hitech Solutions",
	"emailId": "dhriti.bose@hitech.com",
	"contactNo": "8982278987"
  },
  {
    "firstName": "Sneha",
	"lastName": "Kiran",
	"company": "Dastur Ltd",
	"emailId": "john.mathews@dastur.com",
	"contactNo": "8911878987"
  },
  {
    "firstName": "Sayan",
	"lastName": "Mukherjee",
	"company": "Dastur Ltd",
	"emailId": "sayan.mukherjee@dastur.com",
	"contactNo": "8987890087"
  }
];
this.goToFirstPage(this.filteredResult);

  }

  filterLead($event, fieldName) {
    if (fieldName === "firstName")
      this.filter.firstName = $event.target.value;
    if (fieldName === "lastName")
      this.filter.lastName = $event.target.value;
    if (fieldName === "company")
      this.filter.company = $event.target.value;
    if (fieldName === "emailId")
      this.filter.emailId = $event.target.value;
    if (fieldName === "contactNo")
      this.filter.contactNo = $event.target.value;
    let filteredLead: Array<any> = new Array();



    for (let lead of this.searchResult) {
      if ((!!this.filter.firstName && (new String(lead.firstName)).toUpperCase().indexOf(this.filter.firstName.toString().toUpperCase()) > -1)
        || (!!this.filter.lastName && (new String(lead.lastName)).toUpperCase().indexOf(this.filter.lastName.toString().toUpperCase()) > -1)
        || (!!this.filter.company && (new String(lead.company)).toUpperCase().indexOf(this.filter.company.toString().toUpperCase()) > -1)
        || (!!this.filter.emailId && (new String(lead.emailId)).toUpperCase().indexOf(this.filter.emailId.toString().toUpperCase()) > -1)
        || (!!this.filter.contactNo && (new String(lead.contactNo)).toUpperCase().indexOf(this.filter.contactNo.toString().toUpperCase()) > -1)
      ) {
        filteredLead.push(lead);
      }
      else if (!$event.target.value) {
        filteredLead.push(lead);
      }
    }
    this.filteredResult = filteredLead;
    this.goToFirstPage(this.filteredResult)
  }

  goToFirstPage(filteredResult) {
    this.pagination.lowerRange = filteredResult.length === 0 ? 0 : 1;
    if (filteredResult.length >= this.pagination.pageSize) {
      this.leadInfos = this.filteredResult.slice(0, this.pagination.pageSize);
      this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
      this.pagination.disableNext = false;
      this.pagination.disablePrevious = true;
    }
    else {
      this.leadInfos = this.filteredResult;
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
    this.leadInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
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
    this.leadInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
  }

  backToSearchCriteria() {
    this.router.navigate(['leadDetails']);
  }

}
