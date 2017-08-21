import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-contact-details-edit',
  templateUrl: './contact-details-edit.component.html',
  styleUrls: ['./contact-details-edit.component.css']
})
export class ContactDetailsEditComponent implements OnInit {

  private contactName;
  private contactTitle;
  private contactMiddleName;
  private contactLastName;
  private accountName;
  private contactEmailId;
  private contactNo;
  private contactSkype;
  private accountCurrency;

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

  private contactFax;
  private contactHomePhone;
  private contactBirthday;
  private leadSource;
  private description;

  private formGroupBasicInfo: FormGroup;
  private formGroupAddressInfo: FormGroup;
  private formGroupAdditionalInfo: FormGroup;
  private showUpdateMessage = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showEditContactInfo = false;
  private showEditAddressInfo = false;
  private showEditAdditionalInfo = false;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.contactName = params.get("contactName");
      });
      this.populateStaticData(this.contactName);
      this.formGroupInitializer();
  }

  populateStaticData(contactName: string) {
    if (contactName === 'Jones'){
      this.contactTitle = "Mr.";
      this.contactLastName = "Hastings";
      this.contactEmailId = "jones.hastings@abc.com";
      this.contactNo = "9907898700";
      this.accountName = "SpringShield";
      this.contactSkype = "jones.hastings92";
      this.accountCurrency = "INR";
      this.houseNo = "23/24";
      this.streetName = "Deckers Lane";
      this.area = "Church Circle";
      this.pinno = "560093";
      this.districtName = "Bengaluru Urban";
      this.stateName = "Karnataka";
      this.countryName = "India";
      this.contactFax = "4403434";
      this.contactHomePhone = "044567867";
      this.contactBirthday = "03/04/92";
      this.leadSource = "Web";
      this.description = "This is a possible contact. It has been created to maintain and observe it's growth.";
    } else {
      this.contactTitle = "Dr.";
      this.contactLastName = "Thakur";
      this.contactEmailId = "prithvi.thakur@abc.com";
      this.contactNo = "9917898907";
      this.contactSkype = "ZiffCorp";
      this.accountCurrency = "INR";
    }
  }

  formGroupInitializer() {
    this.formGroupBasicInfo = this.formBuilder.group({
      'contactTitle': [this.contactTitle, Validators.required],
      'contactName': [this.contactName, Validators.required],
      'contactMiddleName': [this.contactMiddleName],
      'contactLastName': [this.contactLastName, Validators.required],
      'accountName': [this.accountName],
      'contactEmailId': [this.contactEmailId],
      'contactNo': [this.contactNo, Validators.required],
      'contactSkype': [this.contactSkype, Validators.required],      
      'accountCurrency': [this.accountCurrency, Validators.required]      
    });

    this.formGroupAddressInfo = this.formBuilder.group({
      'mailing': this.initAddressGroup('P', 0),
      'other': this.initAddressGroup('T', 0)
    });

    this.formGroupAdditionalInfo = this.formBuilder.group({
      'contactFax': [this.contactFax],
      'contactHomePhone': [this.contactHomePhone],
      'contactBirthday': [this.contactBirthday],
      'leadSource': [this.leadSource],
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
      this.showEditContactInfo = false;
      this.showEditAddressInfo = false;
      this.showEditAdditionalInfo = false;
    }
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  editContactInfo() {
    this.showEditContactInfo = true;
    this.modalDisplay = true;
  }

  onContactInfoEdit() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditContactInfo = false;
    this.showUpdateMessage = true;
  }

  getShowEditContactInfo() {
    return this.showEditContactInfo;
  }

  editAddressInfo() {
    this.showEditAddressInfo = true;
    this.modalDisplay = true;
  }

  onAddressInfoEdit() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showEditAddressInfo = false;
    this.showUpdateMessage = true;
  }

  getShowEditAddressInfo() {
    return this.showEditAddressInfo;
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

    if (labelName === 'contactBirthday') {
      if (event.type === 'dateChanged') {
        this.contactBirthday.patchValue({ contactBirthday: event.data.formatted });
      }
      if (event.type === 'clear') {
        this.contactBirthday.patchValue({ contactBirthday: '' });
      }
    }
  }

}
