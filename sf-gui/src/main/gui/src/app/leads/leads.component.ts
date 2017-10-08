import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../lead.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {
  private search = 'simple';
  private leadSearchFormGroup: FormGroup;
  private leadQuadruples;
  private message = '';
  private searchString;
  private start = 0
  private pageSize = 6;
  private paginationMessage;


  constructor(private formBuilder: FormBuilder, private leadService: LeadService) { }

  ngOnInit() {
    this.leadSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.leadSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.message = '';
          this.leadQuadruples = undefined;
        } else {
          this.start = 0;
          this.searchString = res;
          this.leadService.searchLeads(this.searchString, 0)
            .subscribe(
            data => {
              this.message = '';
              this.leadQuadruples = this.getleadQuadruples(data);
            },
            err => {
              this.message = err.json()["message"];
            });
        }
      });

  }

  getleadQuadruples(leads) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= leads.length; i++) {
      triple.push(leads[i - 1]);
      if (i % 3 === 0) {
        arr.push(triple);
        triple = [];
      }
    }
    if (triple.length > 0) {
      arr.push(triple);
    }
    return arr;
  }

  toggleSearch() {
    if (this.search === 'simple') {
      this.search = 'advanced';
    }
    else {
      this.search = 'simple';
    }
  }

  next() {
    this.start = this.start + this.pageSize;
    this.leadService.searchLeads(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.leadQuadruples = this.getleadQuadruples(data);
        this.paginationMessage = undefined;
      },
      err => {
        this.start = this.start - this.pageSize;
        if (err.status === 404) {
          this.paginationMessage = "You are on the last page";
          setTimeout(
            function () {
              console.log(this.paginationMessage);
              this.paginationMessage = undefined;
            }.bind(this), 2000);
        }
      });
  }

  previous() {
    if (this.start === 0) {
      this.paginationMessage = "You are on the first page";
      setTimeout(
        function () {
          console.log(this.paginationMessage);
          this.paginationMessage = undefined;
        }.bind(this), 2000);
    } else {
      this.start = this.start - this.pageSize;
      this.leadService.searchLeads(this.searchString, this.start)
        .subscribe(
        data => {
          this.message = '';
          this.leadQuadruples = this.getleadQuadruples(data);
          this.paginationMessage = undefined;
        },
        err => {
          this.start = this.start + this.pageSize;
        });
    }
  }
}
