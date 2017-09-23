import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesrepService } from '../salesrep.service';
import 'rxjs/add/operator/debounceTime.js';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-salesreps',
  templateUrl: './salesreps.component.html',
  styleUrls: ['./salesreps.component.scss']
})
export class SalesrepsComponent implements OnInit {

  private search = 'simple';
  private salesrepSearchFormGroup: FormGroup;
  private salesrepQuadruples;
  private message = '';

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

          this.salesrepService.searchSalesreps(res, 0)
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

}
