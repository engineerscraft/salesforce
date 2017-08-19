import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-details-result',
  templateUrl: './contact-details-result.component.html',
  styleUrls: ['./contact-details-result.component.css']
})
export class ContactDetailsResultComponent implements OnInit {

  private pagination = { pageSize: 20, lowerRange: 0, upperRange: 0, disableNext: false, disablePrevious: false, searchResultSetSize: 0 };
  private filter = { firstName: String, lastName: String, accountName: String, emailId: String, contactNo: String };
  private contactInfos;
  private searchResult: Array<any>;
  private filteredResult: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.searchResult = [
  {
    "firstName": "Jones",
	"lastName": "Hastings",
	"accountName": "SpringShield",
	"emailId": "jones.hastings@abc.com",
	"contactNo": "9907898700"
  },
  {
    "firstName": "Prthvi",
	"lastName": "Thakur",
	"accountName": "ZiffCorp",
	"emailId": "prithvi.thakur@abc.com",
	"contactNo": "9917898907"
  },
  {
    "firstName": "Mathur",
	"lastName": "Prasad",
	"accountName": "SpringShield",
	"emailId": "mathur.prasad@abc.com",
	"contactNo": "9228078987"
  },
  {
    "firstName": "Abhik",
	"lastName": "Bose",
	"accountName": "Wayne Enterprises",
	"emailId": "abhik.bose@xyz.com",
	"contactNo": "9227788987"
  },
  {
    "firstName": "Abhishek",
	"lastName": "Barua",
	"accountName": "Wayne Enterprises",
	"emailId": "abhi.barua@abc.com",
	"contactNo": "9029878987"
  },
  {
    "firstName": "Nitin",
	"lastName": "Das",
	"accountName": "ZiffCorp",
	"emailId": "nitin.das@xyz.com",
	"contactNo": "8999118987"
  },
  {
    "firstName": "Samik",
	"lastName": "Dutta",
	"accountName": "Universal Export",
	"emailId": "samik.dutta@energeticsol.com",
	"contactNo": "9007893387"
  },
  {
    "firstName": "Vishal",
	"lastName": "Agarwal",
	"accountName": "Wayne Enterprises",
	"emailId": "vishal.agarwal@abc.com",
	"contactNo": "8007348987"
  },
  {
    "firstName": "Rangan",
	"lastName": "Dubey",
	"accountName": "Demo, inc.",
	"emailId": "rangan.dubey@energeticsol.com",
	"contactNo": "9446678987"
  },
  {
    "firstName": "Amitava",
	"lastName": "Biswas",
	"accountName": "Colonial Movers",
	"emailId": "amitava.biswas@agarwal.com",
	"contactNo": "9001118987"
  },
  {
    "firstName": "Arunava",
	"lastName": "Roy",
	"accountName": "Demo, inc.",
	"emailId": "arunava.roy@agarwal.com",
	"contactNo": "9997844987"
  },
  {
    "firstName": "Andrew",
	"lastName": "Jones",
	"accountName": "Wayne Enterprises",
	"emailId": "andrew.jones@xyz.com",
	"contactNo": "8900090987"
  },
  {
    "firstName": "Dhiren",
	"lastName": "Basu",
	"accountName": "Colonial Movers",
	"emailId": "dhiren.basu@energeticsol.com",
	"contactNo": "9117832987"
  },
  {
    "firstName": "Bibhas",
	"lastName": "Roy",
	"accountName": "Mooby Corp",
	"emailId": "bibhas.roy@agarwal.com",
	"contactNo": "9987778987"
  },
  {
    "firstName": "Williams",
	"lastName": "Mathur",
	"accountName": "Wayne Enterprises",
	"emailId": "williams.mathur@xyz.com",
	"contactNo": "8955598755"
  },
  {
    "firstName": "Bruno",
	"lastName": "Dsouza",
	"accountName": "Mooby Corp",
	"emailId": "bruno.dsouza@hitech.com",
	"contactNo": "8090898227"
  },
  {
    "firstName": "Varun",
	"lastName": "Varma",
	"accountName": "Vandelay Industries",
	"emailId": "varun.varma@hitech.com",
	"contactNo": "7799866987"
  },
  {
    "firstName": "Dhritiman",
	"lastName": "Mukherjee",
	"accountName": "Praxis Corporation",
	"emailId": "dhriti.mukh@hitech.com",
	"contactNo": "9332278987"
  },
  {
    "firstName": "Sonali",
	"lastName": "Kiran",
	"accountName": "Vandelay Industries",
	"emailId": "sonali.kiran@dastur.com",
	"contactNo": "9881878987"
  },
  {
    "firstName": "Sayam",
	"lastName": "Dastoor",
	"accountName": "Praxis Corporation",
	"emailId": "sayam.dastoor@dastur.com",
	"contactNo": "9900890087"
  }
];
this.filteredResult = [
 {
    "firstName": "Jones",
	"lastName": "Hastings",
	"accountName": "SpringShield",
	"emailId": "jones.hastings@abc.com",
	"contactNo": "9907898700"
  },
  {
    "firstName": "Prthvi",
	"lastName": "Thakur",
	"accountName": "ZiffCorp",
	"emailId": "prithvi.thakur@abc.com",
	"contactNo": "9917898907"
  },
  {
    "firstName": "Mathur",
	"lastName": "Prasad",
	"accountName": "SpringShield",
	"emailId": "mathur.prasad@abc.com",
	"contactNo": "9228078987"
  },
  {
    "firstName": "Abhik",
	"lastName": "Bose",
	"accountName": "Wayne Enterprises",
	"emailId": "abhik.bose@xyz.com",
	"contactNo": "9227788987"
  },
  {
    "firstName": "Abhishek",
	"lastName": "Barua",
	"accountName": "Wayne Enterprises",
	"emailId": "abhi.barua@abc.com",
	"contactNo": "9029878987"
  },
  {
    "firstName": "Nitin",
	"lastName": "Das",
	"accountName": "ZiffCorp",
	"emailId": "nitin.das@xyz.com",
	"contactNo": "8999118987"
  },
  {
    "firstName": "Samik",
	"lastName": "Dutta",
	"accountName": "Universal Export",
	"emailId": "samik.dutta@energeticsol.com",
	"contactNo": "9007893387"
  },
  {
    "firstName": "Vishal",
	"lastName": "Agarwal",
	"accountName": "Wayne Enterprises",
	"emailId": "vishal.agarwal@abc.com",
	"contactNo": "8007348987"
  },
  {
    "firstName": "Rangan",
	"lastName": "Dubey",
	"accountName": "Demo, inc.",
	"emailId": "rangan.dubey@energeticsol.com",
	"contactNo": "9446678987"
  },
  {
    "firstName": "Amitava",
	"lastName": "Biswas",
	"accountName": "Colonial Movers",
	"emailId": "amitava.biswas@agarwal.com",
	"contactNo": "9001118987"
  },
  {
    "firstName": "Arunava",
	"lastName": "Roy",
	"accountName": "Demo, inc.",
	"emailId": "arunava.roy@agarwal.com",
	"contactNo": "9997844987"
  },
  {
    "firstName": "Andrew",
	"lastName": "Jones",
	"accountName": "Wayne Enterprises",
	"emailId": "andrew.jones@xyz.com",
	"contactNo": "8900090987"
  },
  {
    "firstName": "Dhiren",
	"lastName": "Basu",
	"accountName": "Colonial Movers",
	"emailId": "dhiren.basu@energeticsol.com",
	"contactNo": "9117832987"
  },
  {
    "firstName": "Bibhas",
	"lastName": "Roy",
	"accountName": "Mooby Corp",
	"emailId": "bibhas.roy@agarwal.com",
	"contactNo": "9987778987"
  },
  {
    "firstName": "Williams",
	"lastName": "Mathur",
	"accountName": "Wayne Enterprises",
	"emailId": "williams.mathur@xyz.com",
	"contactNo": "8955598755"
  },
  {
    "firstName": "Bruno",
	"lastName": "Dsouza",
	"accountName": "Mooby Corp",
	"emailId": "bruno.dsouza@hitech.com",
	"contactNo": "8090898227"
  },
  {
    "firstName": "Varun",
	"lastName": "Varma",
	"accountName": "Vandelay Industries",
	"emailId": "varun.varma@hitech.com",
	"contactNo": "7799866987"
  },
  {
    "firstName": "Dhritiman",
	"lastName": "Mukherjee",
	"accountName": "Praxis Corporation",
	"emailId": "dhriti.mukh@hitech.com",
	"contactNo": "9332278987"
  },
  {
    "firstName": "Sonali",
	"lastName": "Kiran",
	"accountName": "Vandelay Industries",
	"emailId": "sonali.kiran@dastur.com",
	"contactNo": "9881878987"
  },
  {
    "firstName": "Sayam",
	"lastName": "Dastoor",
	"accountName": "Praxis Corporation",
	"emailId": "sayam.dastoor@dastur.com",
	"contactNo": "9900890087"
  }
];
this.goToFirstPage(this.filteredResult);

	}

	filterContact($event, fieldName) {
    if (fieldName === "firstName")
      this.filter.firstName = $event.target.value;
    if (fieldName === "lastName")
      this.filter.lastName = $event.target.value;
    if (fieldName === "accountName")
      this.filter.accountName = $event.target.value;
    if (fieldName === "emailId")
      this.filter.emailId = $event.target.value;
    if (fieldName === "contactNo")
      this.filter.contactNo = $event.target.value;
    let filteredContact: Array<any> = new Array();



    for (let contact of this.searchResult) {
      if ((!!this.filter.firstName && (new String(contact.firstName)).toUpperCase().indexOf(this.filter.firstName.toString().toUpperCase()) > -1)
        || (!!this.filter.lastName && (new String(contact.lastName)).toUpperCase().indexOf(this.filter.lastName.toString().toUpperCase()) > -1)
        || (!!this.filter.accountName && (new String(contact.accountName)).toUpperCase().indexOf(this.filter.accountName.toString().toUpperCase()) > -1)
        || (!!this.filter.emailId && (new String(contact.emailId)).toUpperCase().indexOf(this.filter.emailId.toString().toUpperCase()) > -1)
        || (!!this.filter.contactNo && (new String(contact.contactNo)).toUpperCase().indexOf(this.filter.contactNo.toString().toUpperCase()) > -1)
      ) {
        filteredContact.push(contact);
      }
      else if (!$event.target.value) {
        filteredContact.push(contact);
      }
    }
    this.filteredResult = filteredContact;
    this.goToFirstPage(this.filteredResult)
	}
	
	goToFirstPage(filteredResult) {
    this.pagination.lowerRange = filteredResult.length === 0 ? 0 : 1;
    if (filteredResult.length >= this.pagination.pageSize) {
      this.contactInfos = this.filteredResult.slice(0, this.pagination.pageSize);
      this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
      this.pagination.disableNext = false;
      this.pagination.disablePrevious = true;
    }
    else {
      this.contactInfos = this.filteredResult;
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
    this.contactInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
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
    this.contactInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
  }

  backToSearchCriteria() {
    this.router.navigate(['contactDetails']);
  }

}
