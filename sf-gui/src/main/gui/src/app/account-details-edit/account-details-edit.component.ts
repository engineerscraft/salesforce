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
      //this.populateStaticData(this.accountName);
      //this.formGroupInitializer();
  }

}
