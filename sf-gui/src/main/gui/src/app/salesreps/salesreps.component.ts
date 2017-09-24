import { Component, OnInit, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesrepService } from '../salesrep.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-salesreps',
  templateUrl: './salesreps.component.html',
  styleUrls: ['./salesreps.component.scss'],
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
  ],
})
export class SalesrepsComponent implements OnInit {

  private search = 'simple';
  private salesrepSearchFormGroup: FormGroup;
  private salesrepQuadruples;
  private message = '';
  private searchString;
  private start = 0
  private pageSize = 6;
  private paginationMessage;

  constructor(private formBuilder: FormBuilder, private salesrepService: SalesrepService) { }

  ngOnInit() {
    this.salesrepSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.salesrepSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.message = '';
          this.salesrepQuadruples = undefined;
        } else {
          this.start = 0;
          this.searchString = res;
          this.salesrepService.searchSalesreps(this.searchString, 0)
            .subscribe(
            data => {
              this.message = '';
              this.salesrepQuadruples = this.getSalesrepQuadruples(data);
            },
            err => {
              this.message = err.json()["message"];
            });
        }
      });

  }

  getSalesrepQuadruples(salesreps) {
    let arr = [];
    let triple = [];
    for (let i = 1; i <= salesreps.length; i++) {
      triple.push(salesreps[i - 1]);
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
    this.salesrepService.searchSalesreps(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.salesrepQuadruples = this.getSalesrepQuadruples(data);
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
      this.salesrepService.searchSalesreps(this.searchString, this.start)
        .subscribe(
        data => {
          this.message = '';
          this.salesrepQuadruples = this.getSalesrepQuadruples(data);
          this.paginationMessage = undefined;
        },
        err => {
          this.start = this.start + this.pageSize;
        });
    }
  }  

}
