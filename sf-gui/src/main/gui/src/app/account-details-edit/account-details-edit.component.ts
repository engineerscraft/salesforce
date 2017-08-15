import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-account-details-edit',
  templateUrl: './account-details-edit.component.html',
  styleUrls: ['./account-details-edit.component.css']
})
export class AccountDetailsEditComponent implements OnInit {

  private accountName;
  private parentAccount;
  private leadSource;
  private accountCurrency;
  private accountEmailId;
  private accountContactNo;

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

  private accountWebsite;
  private accountFax;
  private noOfEmployees;
  private annualRevenue;
  private industry;
  private description;

  private formGroupBasicInfo: FormGroup;
  private formGroupAdditionalInfo: FormGroup;
  private showUpdateMessage = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showEditAccountInfo = false;
  private showEditAdditionalInfo = false;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.accountName = params.get("accountName");
      });
      this.populateStaticData(this.accountName);
      this.formGroupInitializer();
  }

  populateStaticData(name: string) {
    if (name === 'Galaxy Corp'){
      this.parentAccount = "LexCorp";
      this.leadSource = "Partner";
      this.accountCurrency = "INR";
      this.accountEmailId = "info.contact@galaxycorp.com";
      this.accountContactNo = "4117898907";          
      this.houseNo = "23";
      this.streetName = "R.B. Avenue";
      this.area = "Gariahat";
      this.pinno = "700019";
      this.districtName = "Kolkata";
      this.stateName = "West Bengal";
      this.countryName = "India";
      this.accountWebsite = "www.galaxycorp.co.in";
      this.accountFax = "41122323";
      this.noOfEmployees = 75;
      this.annualRevenue = "55,00,000 INR";      
      this.industry = "Agriculture";
      this.description = "This is an Account. It has been created to maintain and observe the lead and opportunity's growth.";
    } else {
      this.leadSource = "Advertisement";
      this.accountCurrency = "INR";
      this.accountEmailId = "info.contact@widgetcorp.com";
      this.accountContactNo = "9227898700";      
    }
  }

  formGroupInitializer() {
    this.formGroupBasicInfo = this.formBuilder.group({
      'accountName': [this.accountName, Validators.required],
      'parentAccount': [this.parentAccount],
      'leadSource': [this.leadSource, Validators.required],
      'accountCurrency': [this.accountCurrency, Validators.required],
      'accountEmailId': [this.accountEmailId],
      'accountContactNo': [this.accountContactNo, Validators.required],
      'billing': this.initAddressGroup('P', 0),
      'shipping': this.initAddressGroup('T', 1)
    });

    this.formGroupAdditionalInfo = this.formBuilder.group({
      'accountWebsite': [this.accountWebsite],
      'accountFax': [this.accountFax],
      'noOfEmployees': [this.noOfEmployees],
      'annualRevenue': [this.annualRevenue],      
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
      this.showEditAccountInfo = false;
      this.showEditAdditionalInfo = false;
    }
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  editAccountInfo() {
    this.showEditAccountInfo = true;
    this.modalDisplay = true;
  }

  onAccountInfoEdit() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditAccountInfo = false;
    this.showUpdateMessage = true;
  }

  getShowEditAccountInfo() {
    return this.showEditAccountInfo;
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

}
