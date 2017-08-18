import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.css']
})
export class ContactDetailsComponent implements OnInit {

  private formGroupSearch: FormGroup;
  private formGroupContactCreate: FormGroup;
  private showCreateBasicContact = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showUpdateMessage = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formGroupSearch = this.formBuilder.group({
      firstName: ['', []],
      lastName: ['', []],
      accountName: ['', []],      
      emailId: ['', []],
      contactNo: ['', []],
      currency: ['', []]      
    });
    this.formGroupContactCreate = this.formBuilder.group({
      'title': ['', Validators.required],
      'firstName': ['', Validators.required],
      'middleName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'accountName': ['', Validators.required],
      'emailId': ['', CustomValidator.validEmail],
      'contactNo': ['', CustomValidator.validPhone],      
      'skype': ['', Validators.required],
      'currency': ['', Validators.required]
    });
  }

  search() {
    this.router.navigate(['contactDetailsResult']);
  }

  createBasicContact() {
    this.showCreateBasicContact = true;
      this.modalDisplay = true;
  }

  onContactInfoCreate() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showCreateBasicContact = false;
    this.showUpdateMessage = true;
  }

  getShowCreateBasicContact() {
    return this.showCreateBasicContact;
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  getShowUpdateMessage() {
    return this.showUpdateMessage;
  }

  closeAllDialog(event) {
    if (event === null || event.undefined || event.currentTarget === event.target) {
      this.showCreateBasicContact = false;
      this.modalDisplay = false;
      this.showUpdateMessage = false;
    }
  }

}
