import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-opportunity-details-edit',
  templateUrl: './opportunity-details-edit.component.html',
  styleUrls: ['./opportunity-details-edit.component.css']
})
export class OpportunityDetailsEditComponent implements OnInit {

  private opportunityName;
  private accountName;
  private opportunityType;
  private opportunityCurrency;
  private primaryCampaign;

  private closeDate;
  private opportunityStage;
  private opportunityAmount;
  private leadSource;
  private productType;

  private formGroupBasicInfo: FormGroup;
  private formGroupAdditionalInfo: FormGroup;
  private showUpdateMessage = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showEditOpportunityInfo = false;
  private showEditAdditionalInfo = false;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.opportunityName = params.get("opportunityName");
      });
      this.populateStaticData(this.opportunityName);
      this.formGroupInitializer();
  }

  populateStaticData(name: string) {
    if (name === 'LexCorp - 20 Widgets'){
      this.accountName = "LexCorp";
      this.opportunityType = "ExistingBusiness";
      this.opportunityCurrency = "INR";
      this.primaryCampaign = "Andrew Jones";
      this.closeDate = "";
      this.opportunityStage = "Qualification";
      this.opportunityAmount = "100000 INR";
      this.leadSource = "Public Relations";
      this.productType = "Hardware";
    } else {
      this.accountName = "Axis Chemical Co.";
      this.opportunityType = "ExistingBusiness";
      this.opportunityCurrency = "INR";
      this.primaryCampaign = "";
    }
  }

  formGroupInitializer() {
    this.formGroupBasicInfo = this.formBuilder.group({
      'opportunityName': [this.opportunityName, Validators.required],
      'accountName': [this.accountName, Validators.required],
      'opportunityType': [this.opportunityType],
      'opportunityCurrency': [this.opportunityCurrency, Validators.required],      
      'primaryCampaign': [this.primaryCampaign]
    });

    this.formGroupAdditionalInfo = this.formBuilder.group({
      'closeDate': [this.closeDate],
      'opportunityStage': [this.opportunityStage],
      'opportunityAmount': [this.opportunityAmount],
      'leadSource': [this.leadSource],
      'productType': [this.productType]
    });
  }

  getShowUpdateMessage() {
    return this.showUpdateMessage;
  }

  closeAllDialog(event) {
    if (event === null || event.undefined || event.currentTarget === event.target) {
      this.modalDisplay = false;
      this.showUpdateMessage = false;
      this.showEditOpportunityInfo = false;
      this.showEditAdditionalInfo = false;
    }
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  editOpportunityInfo() {
    this.showEditOpportunityInfo = true;
    this.modalDisplay = true;
  }

  onOpportunityInfoEdit() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditOpportunityInfo = false;
    this.showUpdateMessage = true;
  }

  getShowEditOpportunityInfo() {
    return this.showEditOpportunityInfo;
  }

  editAdditionalInfo() {
    this.showEditAdditionalInfo = true;
    this.modalDisplay = true;
  }

  onAdditionalInfoEdit() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditAdditionalInfo = false;
    this.showUpdateMessage = true;
  }

  getShowEditAdditionalInfo() {
    return this.showEditAdditionalInfo;
  }

  /**
   * 
   * @param event Date change handler for Employee Creation
   * the labelName guides which field is to be changed
   * @param labelName 
   */
  changeDate(event, labelName) {

    if (labelName === 'closeDate') {
      if (event.type === 'dateChanged') {
        this.closeDate.patchValue({ closeDate: event.data.formatted });
      }
      if (event.type === 'clear') {
        this.closeDate.patchValue({ closeDate: '' });
      }
    }
  }

}
