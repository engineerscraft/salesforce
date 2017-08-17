import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opportunity-details-result',
  templateUrl: './opportunity-details-result.component.html',
  styleUrls: ['./opportunity-details-result.component.css']
})
export class OpportunityDetailsResultComponent implements OnInit {

  private pagination = { pageSize: 20, lowerRange: 0, upperRange: 0, disableNext: false, disablePrevious: false, searchResultSetSize: 0 };
  private filter = { opportunityName: String, accountName: String, opportunityType: String, opportunityCurrency: String, primaryCampaign: String };
  private opportunityInfos;
  private searchResult: Array<any>;
  private filteredResult: Array<any>;

  constructor(private router: Router) { }

  ngOnInit() {
    this.searchResult = [
  {
    "opportunityName": "LexCorp - 20 Widgets",
	"accountName": "LexCorp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Andrew Jones"
  },
  {
    "opportunityName": "LexCorp - June Order",
	"accountName": "LexCorp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Andrew Jones"
  },
  {
    "opportunityName": "Axis Chemical Co. - August Order",
	"accountName": "Axis Chemical Co.",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Axis Chemical Co. - January Order",
	"accountName": "Axis Chemical Co.",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Thrift Bank - May Order",
	"accountName": "Thrift Bank",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Demo, inc. - July Order",
	"accountName": "Demo, inc.",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Demo, inc. - June Order",
	"accountName": "Demo, inc.",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Mooby Corp - September Order",
	"accountName": "Mooby Corp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Thrift Bank - 20 Widgets",
	"accountName": "Thrift Bank",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Colonial Movers - February Order",
	"accountName": "Colonial Movers",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Wayne Enterprises"
  },
  {
    "opportunityName": "Mooby Corp - 40 Widgets",
	"accountName": "Mooby Corp",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Praxis Corporation - 20 Widgets",
	"accountName": "Praxis Corporation",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "SpringShield - July Order",
	"accountName": "SpringShield",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Colonial Movers - December Order",
	"accountName": "Colonial Movers",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Wayne Enterprises"
  },
  {
    "opportunityName": "SpringShield - April Order",
	"accountName": "SpringShield",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "ZiffCorp - 30 Widgets",
	"accountName": "ZiffCorp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Kumatsu Motors - 40 parts",
	"accountName": "Kumatsu Motors",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Praxis Corporation - March Order",
	"accountName": "Praxis Corporation",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Kumatsu Motors - December Order",
	"accountName": "Kumatsu Motors",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "ZiffCorp - November Order",
	"accountName": "ZiffCorp",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  }
];

this.filteredResult = [
  {
    "opportunityName": "LexCorp - 20 Widgets",
	"accountName": "LexCorp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Andrew Jones"
  },
  {
    "opportunityName": "LexCorp - June Order",
	"accountName": "LexCorp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Andrew Jones"
  },
  {
    "opportunityName": "Axis Chemical Co. - August Order",
	"accountName": "Axis Chemical Co.",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Axis Chemical Co. - January Order",
	"accountName": "Axis Chemical Co.",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Thrift Bank - May Order",
	"accountName": "Thrift Bank",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Demo, inc. - July Order",
	"accountName": "Demo, inc.",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Demo, inc. - June Order",
	"accountName": "Demo, inc.",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Mooby Corp - September Order",
	"accountName": "Mooby Corp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Thrift Bank - 20 Widgets",
	"accountName": "Thrift Bank",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Colonial Movers - February Order",
	"accountName": "Colonial Movers",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Wayne Enterprises"
  },
  {
    "opportunityName": "Mooby Corp - 40 Widgets",
	"accountName": "Mooby Corp",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Praxis Corporation - 20 Widgets",
	"accountName": "Praxis Corporation",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "SpringShield - July Order",
	"accountName": "SpringShield",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Colonial Movers - December Order",
	"accountName": "Colonial Movers",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": "Wayne Enterprises"
  },
  {
    "opportunityName": "SpringShield - April Order",
	"accountName": "SpringShield",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "ZiffCorp - 30 Widgets",
	"accountName": "ZiffCorp",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Kumatsu Motors - 40 parts",
	"accountName": "Kumatsu Motors",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Praxis Corporation - March Order",
	"accountName": "Praxis Corporation",
	"opportunityType": "Existing Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "Kumatsu Motors - December Order",
	"accountName": "Kumatsu Motors",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  },
  {
    "opportunityName": "ZiffCorp - November Order",
	"accountName": "ZiffCorp",
	"opportunityType": "New Business",
	"opportunityCurrency": "INR - Indian Rupee",
	"primaryCampaign": ""
  }
];
  this.goToFirstPage(this.filteredResult);

  }

  filterOpportunity($event, fieldName) {
    if (fieldName === "opportunityName")
      this.filter.opportunityName = $event.target.value;
    if (fieldName === "accountName")
      this.filter.accountName = $event.target.value;
    if (fieldName === "opportunityType")
      this.filter.opportunityType = $event.target.value;
    if (fieldName === "opportunityCurrency")
      this.filter.opportunityCurrency = $event.target.value;
    if (fieldName === "primaryCampaign")
      this.filter.primaryCampaign = $event.target.value;
    let filteredOpportunity: Array<any> = new Array();



    for (let opportunity of this.searchResult) {
      if ((!!this.filter.opportunityName && (new String(opportunity.opportunityName)).toUpperCase().indexOf(this.filter.opportunityName.toString().toUpperCase()) > -1)
        || (!!this.filter.accountName && (new String(opportunity.accountName)).toUpperCase().indexOf(this.filter.accountName.toString().toUpperCase()) > -1)
        || (!!this.filter.opportunityType && (new String(opportunity.opportunityType)).toUpperCase().indexOf(this.filter.opportunityType.toString().toUpperCase()) > -1)
        || (!!this.filter.opportunityCurrency && (new String(opportunity.opportunityCurrency)).toUpperCase().indexOf(this.filter.opportunityCurrency.toString().toUpperCase()) > -1)
        || (!!this.filter.primaryCampaign && (new String(opportunity.primaryCampaign)).toUpperCase().indexOf(this.filter.primaryCampaign.toString().toUpperCase()) > -1)
      ) {
        filteredOpportunity.push(opportunity);
      }
      else if (!$event.target.value) {
        filteredOpportunity.push(opportunity);
      }
    }
    this.filteredResult = filteredOpportunity;
    this.goToFirstPage(this.filteredResult)
  }

  goToFirstPage(filteredResult) {
    this.pagination.lowerRange = filteredResult.length === 0 ? 0 : 1;
    if (filteredResult.length >= this.pagination.pageSize) {
      this.opportunityInfos = this.filteredResult.slice(0, this.pagination.pageSize);
      this.pagination.upperRange = this.pagination.lowerRange + this.pagination.pageSize - 1;
      this.pagination.disableNext = false;
      this.pagination.disablePrevious = true;
    }
    else {
      this.opportunityInfos = this.filteredResult;
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
    this.opportunityInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
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
    this.opportunityInfos = this.filteredResult.slice(this.pagination.lowerRange - 1, this.pagination.upperRange);
  }

  backToSearchCriteria() {
    this.router.navigate(['opportunityDetails']);
  }

}
