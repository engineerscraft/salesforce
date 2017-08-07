import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.css']
})
export class LeadDetailsComponent implements OnInit {

  private formGroupSearch: FormGroup;

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
  }

  search() {
    this.router.navigate(['leadDetailsResult']);
  }

}
