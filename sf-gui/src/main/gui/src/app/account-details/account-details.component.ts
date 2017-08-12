import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  private formGroupSearch: FormGroup;
  private formGroupAccountCreate: FormGroup;
  private showCreateBasicAccount = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showUpdateMessage = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formGroupSearch = this.formBuilder.group({
      accountName: ['', []],      
      emailId: ['', []],
      contactNo: ['', []],
      currency: ['', []],
      leadSource: ['', []]      
    });
    this.formGroupAccountCreate = this.formBuilder.group({
      'accountName': ['', Validators.required],
      'parentAccount': ['', Validators.required],
      'emailId': ['', CustomValidator.validEmail],
      'contactNo': ['', CustomValidator.validPhone],      
      'currency': ['', Validators.required],
      'leadSource': ['', Validators.required]
    });
  }

  search() {
    this.router.navigate(['accountDetailsResult']);
  }

  createBasicAccount() {
    this.showCreateBasicAccount = true;
      this.modalDisplay = true;
  }

  onAccountInfoCreate() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showCreateBasicAccount = false;
    this.showUpdateMessage = true;
  }

  getShowCreateBasicAccount() {
    return this.showCreateBasicAccount;
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  getShowUpdateMessage() {
    return this.showUpdateMessage;
  }

  closeAllDialog(event) {
    if (event === null || event.undefined || event.currentTarget === event.target) {
      this.showCreateBasicAccount = false;
      this.modalDisplay = false;
      this.showUpdateMessage = false;
    }
  }

}
