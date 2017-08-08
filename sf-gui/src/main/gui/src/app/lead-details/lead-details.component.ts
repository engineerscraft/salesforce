import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../validators/custom-validators';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent implements OnInit {

  private formGroupSearch: FormGroup;
  private formGroupLeadCreate: FormGroup;
  private showCreateBasicLead = false;
  private modalDisplay = false;
  private processingInProgress = false;
  private showUpdateMessage = false;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.formGroupSearch = this.formBuilder.group({
      firstName: ['', []],
      lastName: ['', []],
      emailId: ['', []],
      status: ['', []],
      company: ['', []],
      contactNo: ['', []]
    });
    this.formGroupLeadCreate = this.formBuilder.group({
      'title': ['', Validators.required],
      'leadFirstName': ['', Validators.required],
      'leadMiddleName': ['', Validators.required],
      'leadLastName': ['', Validators.required],
      'emailId': ['', CustomValidator.validEmail],
      'contactNo': ['', CustomValidator.validPhone],
      'companyName': ['', Validators.required],
      'leadStatus': ['', Validators.required],
      'currency': ['', Validators.required]
    });
  }

  search() {
    this.router.navigate(['leadDetailsResult']);
  }

  createBasicLead() {
    this.showCreateBasicLead = true;
      this.modalDisplay = true;
  }

  onLeadInfoCreate() {
    this.processingInProgress = true;
    this.processingInProgress = false;
    this.showCreateBasicLead = false;
    this.showUpdateMessage = true;
  }

  getShowCreateBasicLead() {
    return this.showCreateBasicLead;
  }

  isProcessingInProgress() {
    return this.processingInProgress;
  }

  getShowUpdateMessage() {
    return this.showUpdateMessage;
  }

  closeAllDialog(event) {
    if (event === null || event.undefined || event.currentTarget === event.target) {
      this.showCreateBasicLead = false;
      this.modalDisplay = false;
      this.showUpdateMessage = false;
    }
  }

}
