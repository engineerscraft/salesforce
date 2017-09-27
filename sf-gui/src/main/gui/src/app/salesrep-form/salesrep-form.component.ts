import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesrepService } from '../salesrep.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-salesrep-form',
  templateUrl: './salesrep-form.component.html',
  styleUrls: ['./salesrep-form.component.scss']
})
export class SalesrepFormComponent implements OnInit {

  @Input() readOnly: boolean = null;
  @Input() mode = "Create";

  private salesRepFormGroup: FormGroup;
  private attr = '';
  private buttonName = 'Create';
  private message = '';
  private pubKey;
  private formTitle = 'Sales Person Creation';

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private salesrepService: SalesrepService,
    private router: Router,
    private parserFormatter: NgbDateParserFormatter) { }

  ngOnInit() {

     this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    }); 

    if(this.mode === "View") {
      this.readOnly = true;
      this.formTitle = 'Sales Person Details';
    }

    this.salesRepFormGroup = this.formBuilder.group({

        salesRepId: [''],
        pubKey: [''],
        fName: ['', [Validators.required]],
        mName: [''],
        lName: [''],
        supPubKey: ['', [Validators.required]],
        desig: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mob: ['', [Validators.required]],
        statusId: ['1'],
        doj: ['', [Validators.required]],
        land: [''],
        extn: ['']
    });

    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.pubKey = params.get('pubKey');
      });

    if (this.pubKey) {
      this.salesrepService.readSalesRep(this.pubKey)
        .subscribe(
        res => {
          this.salesRepFormGroup.setValue(res);
          console.log("Fetched Date After service call====== " + JSON.stringify(this.salesRepFormGroup.get('doj').value));
          var dojDate = new Date(JSON.stringify(this.salesRepFormGroup.get('doj').value));
          var year =  dojDate.getFullYear();
          var month = dojDate.getMonth();
          var day = dojDate.getDay();
          console.log("Year === " + year + " , Month === " + month + " , Day === " + day);
        },
        err => {
          this.message = err.status + " : " + err.statusText;
          this.message = this.message + " : " + err.json()["message"];
        }
        );
    }

    if (this.pubKey) {
      this.buttonName = 'Modify';
    }


    if (this.mode === 'View') {

    }
  }

  submit() {
    this.message = '';
    if (this.mode === 'Create') {
      let dojDate = this.salesRepFormGroup.get('doj').value.day + '/' + this.salesRepFormGroup.get('doj').value.month + '/' + this.salesRepFormGroup.get('doj').value.year;
      this.salesRepFormGroup.patchValue({ doj: dojDate });
      console.log("Input JSON ====== " + JSON.stringify(this.salesRepFormGroup.value));
      this.salesrepService.createSalesRep(JSON.stringify(this.salesRepFormGroup.value))
        .subscribe(
        res => {
          this.router.navigate(['salesrepDetails/' + res.pubKey]);
        },
        err => {
          this.message = err.status + " : " + err.statusText;
          this.message = this.message + " : " + err.json()["message"];
        });
    } else if (this.mode === 'View') {
      this.readOnly = null;
      this.buttonName = 'Save';
      this.mode = 'Modify';      
    } else if (this.mode === 'Modify') {
      let dojDate = this.salesRepFormGroup.get('doj').value.day + '/' + this.salesRepFormGroup.get('doj').value.month + '/' + this.salesRepFormGroup.get('doj').value.year;
      this.salesRepFormGroup.patchValue({ doj: dojDate });
      this.salesrepService.updateSalesRep(this.pubKey, JSON.stringify(this.salesRepFormGroup.value))
        .subscribe(
        res => {
          this.readOnly = true;
          this.buttonName = 'Modify';
          this.mode = 'View';
        },
        err => {
          this.message = err.status + " : " + err.statusText;
          this.message = this.message + " : " + err.json()["message"];
        }
        );
    }
  }

  dismissAlert() {
    this.message = undefined;
  }

  cancel() {
    this.readOnly = true;
    this.buttonName = 'Modify';
    this.mode = 'View';
  }

}
