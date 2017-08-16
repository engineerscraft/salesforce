import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-opportunity-details',
  templateUrl: './opportunity-details.component.html',
  styleUrls: ['./opportunity-details.component.css']
})
export class OpportunityDetailsComponent implements OnInit {

  private formGroupSearch: FormGroup;
  private formGroupOpportunityCreate: FormGroup;
  private showCreateBasicOpportunity = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showUpdateMessage = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formGroupSearch = this.formBuilder.group({
      opportunityName: ['', []],
      accountName: ['', []],
      opportunityType: ['', []],
      opportunityCurrency: ['', []]
    });
    this.formGroupOpportunityCreate = this.formBuilder.group({
      'opportunityName': ['', Validators.required],
      'accountName': ['', Validators.required],
      'opportunityType': ['', Validators.required],
      'primaryCampaign': ['', Validators.required],
      'opportunityCurrency': ['', Validators.required]
    });
  }

  search() {
    this.router.navigate(['opportunityDetailsResult']);
  }

  createBasicOpportunity() {
    this.showCreateBasicOpportunity = true;
      this.modalDisplay = true;
  }

  onOpportunityInfoCreate() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showCreateBasicOpportunity = false;
    this.showUpdateMessage = true;
  }

  getShowCreateBasicOpportunity() {
    return this.showCreateBasicOpportunity;
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  getShowUpdateMessage() {
    return this.showUpdateMessage;
  }

  closeAllDialog(event) {
    if (event === null || event.undefined || event.currentTarget === event.target) {
      this.showCreateBasicOpportunity = false;
      this.modalDisplay = false;
      this.showUpdateMessage = false;
    }
  }

}
