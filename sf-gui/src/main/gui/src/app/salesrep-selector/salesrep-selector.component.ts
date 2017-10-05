import { Component, OnInit, trigger, transition, style, animate, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesrepService } from '../salesrep.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-salesrep-selector',
  templateUrl: './salesrep-selector.component.html',
  styleUrls: ['./salesrep-selector.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(-50%)', opacity: 0 }))
      ])
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(-50%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateY(-50%)', opacity: 0 }))
      ])
    ])
  ]
})
export class SalesrepSelectorComponent implements OnInit {

  private salesrepSearchFormGroup: FormGroup;
  private searchString;
  private salesreps;
  private start = 0
  private pageSize = 6;
  private paginationMessage;
  private message = '';

  @Output() add = new EventEmitter<any>();
  @Input() addedSalesreps;

  constructor(private formBuilder: FormBuilder,
    private salesrepService: SalesrepService) { }

  ngOnInit() {
    this.salesrepSearchFormGroup = this.formBuilder.group({
      searchString: ['', [Validators.required]]
    });

    this.salesrepSearchFormGroup.get("searchString").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        if (res.trim().length === 0) {
          this.salesreps = undefined;
        } else {
          this.searchString = res;
          this.salesrepService.searchSalesreps(this.searchString, 0)
            .subscribe(
            data => {
              this.salesreps = data;
              this.salesreps.forEach(function (sales) {
                if (this.addedSalesreps.pubKey === sales.pubKey) {
                  sales.alreadyAdded = true;
                }
              }.bind(this));
            },
            err => {

            });
        }
      });
  }

  addSalesrep(salesrep) {
    this.add.emit({
      "pubKey": salesrep.pubKey,
      "fName": salesrep.fName,
      "mName": salesrep.mName,
      "lName": salesrep.lName,
      "email": salesrep.email,
      "mob": salesrep.mob,
      "land": salesrep.land,
      "extn": salesrep.extn,
      "desig": salesrep.desig
    });
    this.salesreps.forEach(function (sales) {
      if (salesrep.pubKey === sales.pubKey) {
        sales.alreadyAdded = true;
      } else {
        sales.alreadyAdded = false;
      }
    });
  }

  next() {
    this.start = this.start + this.pageSize;
    this.salesrepService.searchSalesreps(this.searchString, this.start)
      .subscribe(
      data => {
        this.message = '';
        this.salesreps = data;
        this.paginationMessage = undefined;
        this.salesreps.forEach(function (sales) {
            if (sales.pubKey === this.addedSalesreps.pubKey) {
              sales.alreadyAttached = true;
            }
        }.bind(this));

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
          this.paginationMessage = undefined;
        }.bind(this), 2000);
    } else {
      this.start = this.start - this.pageSize;
      this.salesrepService.searchSalesreps(this.searchString, this.start)
        .subscribe(
        data => {
          this.salesreps = data;
          this.message = '';
          this.paginationMessage = undefined;
          this.salesreps.forEach(function (sales) {
              if (sales.pubKey === this.addedSalesreps.pubKey) {
                sales.alreadyAttached = true;
              }
          }.bind(this));
        },
        err => {
          this.start = this.start + this.pageSize;
        });
    }
  }

}
