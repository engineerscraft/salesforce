import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-lead-details-edit',
  templateUrl: './lead-details-edit.component.html',
  styleUrls: ['./lead-details-edit.component.css']
})
export class LeadDetailsEditComponent implements OnInit {

  private leadName;
  private leadTitle = "Mr";
  private leadMiddleName;
  private leadLastName = "Mathews";
  private leadEmailId = "john.mathews@abc.com";
  private leadContactNo = "8987898700";
  private leadCompany = "ABC Ltd";
  private leadStatus = "Open";
  private leadCurrency = "INR";
  private leadWebsite;

  private houseNo;
  private streetName;
  private area;
  private pinno;
  private region;
  private districtId;
  private districtName;
  private stateId;
  private stateName;
  private countryId;
  private countryName;
  private noOfEmployees;
  private annualRevenue;
  private leadSource;
  private industry;
  private description;

  private formGroupBasicInfo: FormGroup;
  private formGroupAdditionalInfo: FormGroup;
  private showUpdateMessage = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showEditLeadInfo = false;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.leadName = params.get("leadName");
      });
      this.formGroupInitializer();
  }

  formGroupInitializer() {
    this.formGroupBasicInfo = this.formBuilder.group({
      'leadTitle': [this.leadTitle, Validators.required],
      'leadFirstName': [this.leadName, Validators.required],
      'leadMiddleName': [this.leadMiddleName],
      'leadLastName': [this.leadLastName, Validators.required],      
      'leadEmailId': [this.leadEmailId],
      'leadContactNo': [this.leadContactNo, Validators.required],
      'leadCompany': [this.leadCompany, Validators.required],      
      'leadStatus': [this.leadStatus, Validators.required],
      'leadCurrency': [this.leadCurrency],
      'leadWebsite': [this.leadWebsite],
      'permanent': this.initAddressGroup('P', 0)
    });

    this.formGroupAdditionalInfo = this.formBuilder.group({
      'noOfEmployees': [this.noOfEmployees],
      'annualRevenue': [this.annualRevenue],
      'leadSource': [this.leadSource],
      'industry': [this.industry],
      'description': [this.description]
    });
  }

  /**
   * Create form builder group for address
   */
  initAddressGroup(type: string, count: number) {
    return this.formBuilder.group({
      'houseNo': [this.houseNo],
      'streetName': [this.streetName],
      'area': [this.area],
      'pinno': [this.pinno],
      'region': [this.region],
      'districtId': [this.districtId],
      'districtName': [this.districtName],
      'stateId': [this.stateId],
      'stateName': [this.stateName],
      'countryId': [this.countryId],
      'countryName': [this.countryName],
      'addressType': type
    });
  }

  getShowUpdateMessage() {
    return this.showUpdateMessage;
  }

  closeAllDialog(event) {
    if (event === null || event.undefined || event.currentTarget === event.target) {
      this.modalDisplay = false;
      this.showUpdateMessage = false;
    }
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  editLeadInfo() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditLeadInfo = false;
    this.showUpdateMessage = true;
  }

}
