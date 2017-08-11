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
  private leadTitle;
  private leadMiddleName;
  private leadLastName;
  private leadEmailId;
  private leadContactNo;
  private leadCompany;
  private leadStatus;
  private leadCurrency;
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
      this.populateStaticData(this.leadName);
      this.formGroupInitializer();
  }

  populateStaticData(name: string) {
    if (name === 'John'){
      this.leadTitle = "Mr.";
      this.leadLastName = "Mathews";
      this.leadEmailId = "john.mathews@abc.com";
      this.leadContactNo = "8987898700";
      this.leadCompany = "ABC Ltd";
      this.leadStatus = "OPEN";
      this.leadCurrency = "INR";
      this.leadWebsite = "www.abcltd.co.in";
      this.houseNo = "181";
      this.streetName = "Russel Street";
      this.area = "Trinity Circle";
      this.pinno = "560088";
      this.districtName = "Bengaluru Urban";
      this.stateName = "Karnataka";
      this.countryName = "India";
      this.noOfEmployees = 50;
      this.annualRevenue = "25,00,000 INR";
      this.leadSource = "Public Relations";
      this.industry = "Banking";
      this.description = "This is a possible lead. It has been created to maintain and observe it's growth.";
    } else {
      this.leadTitle = "Dr.";
      this.leadLastName = "Dey";
      this.leadEmailId = "rik.dey@abc.com";
      this.leadContactNo = "8987898907";
      this.leadCompany = "ABC Ltd";
      this.leadStatus = "OPEN";
      this.leadCurrency = "INR";
    }
  }

  formGroupInitializer() {
    this.formGroupBasicInfo = this.formBuilder.group({
      'leadTitle': [this.leadTitle, Validators.required],
      'leadName': [this.leadName, Validators.required],
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
      this.showEditLeadInfo = false;
    }
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  editLeadInfo() {
    this.showEditLeadInfo = true;
    this.modalDisplay = true;
  }

  onLeadInfoEdit() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditLeadInfo = false;
    this.showUpdateMessage = true;
  }

  getShowEditLeadInfo() {
    return this.showEditLeadInfo;
  }

}
