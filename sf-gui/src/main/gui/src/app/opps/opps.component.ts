import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OppService } from '../opp.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-opps',
  templateUrl: './opps.component.html',
  styleUrls: ['./opps.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(-50%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(-50%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class OppsComponent implements OnInit {
  private search = 'simple';
  private opportunitySearchFormGroup: FormGroup;
  private opportunityQuadruples;
  private message = '';
  private searchString;
  private start = 0
  private pageSize = 6;
  private paginationMessage;


  constructor(private formBuilder: FormBuilder, private oppService: OppService) { }

  ngOnInit() {
    this.opportunitySearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.opportunitySearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.message = '';
          this.opportunityQuadruples = undefined;
        } else {
          this.start = 0;
          this.searchString = res;
          this.oppService.searchOpportunities(this.searchString, 0)
            .subscribe(
            data => {
              this.message = '';
              this.opportunityQuadruples = this.getopportunityQuadruples(data);
            },
            err => {
              this.paginationMessage = err.status + " : " + err.statusText;
              setTimeout(
                function () {
                  this.paginationMessage = undefined;
                }.bind(this), 2000);
    
              this.paginationMessage = this.paginationMessage + " : " + err.json()["message"];
                });
        }
      });

  }

  getopportunityQuadruples(opportunitys) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= opportunitys.length; i++) {
      triple.push(opportunitys[i - 1]);
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
    this.oppService.searchOpportunities(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.opportunityQuadruples = this.getopportunityQuadruples(data);
        this.paginationMessage = undefined;
      },
      err => {
        this.start = this.start - this.pageSize;
        if (err.status === 404) {
          this.paginationMessage = "You are on the last page";
          setTimeout(
            function () {
              this.paginationMessage = undefined;
            }.bind(this), 2000);
        } else {
          this.paginationMessage = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessage = undefined;
            }.bind(this), 2000);

          this.paginationMessage = this.paginationMessage + " : " + err.json()["message"];
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
      this.oppService.searchOpportunities(this.searchString, this.start)
        .subscribe(
        data => {
          this.message = '';
          this.opportunityQuadruples = this.getopportunityQuadruples(data);
          this.paginationMessage = undefined;
        },
        err => {
          this.start = this.start + this.pageSize;
          this.paginationMessage = err.status + " : " + err.statusText;
          setTimeout(
            function () {
              this.paginationMessage = undefined;
            }.bind(this), 2000);

          this.paginationMessage = this.paginationMessage + " : " + err.json()["message"];
        });
    }
  }
}
