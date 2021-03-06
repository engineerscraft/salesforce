import { Component, OnInit, Input, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesrepService } from '../salesrep.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/operator/filter';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-salesrep-form',
  templateUrl: './salesrep-form.component.html',
  styleUrls: ['./salesrep-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(25%)', opacity: 0 }))
      ])
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-5%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(5%)', opacity: 0 }))
      ])
    ])
  ]
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

  private salesrep = {};
  private closeResult: string;
  private modal;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private salesrepService: SalesrepService,
    private router: Router,
    private modalService: NgbModal,
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
      salesRepSummary: this.formBuilder.group({
        pubKey: [''],
        fName: ['', [Validators.required]],
        mName: [''],
        lName: [''],
        desig: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mob: ['', [Validators.required]],
        land: [''],
        extn: ['']
      }),        
      supPubKey: ['', [Validators.required]],
      statusId: ['1'],
      doj: ['', [Validators.required]]
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
          
          this.salesRepFormGroup.patchValue({doj: this.parserFormatter.parse(res.doj)});

          if (res.supPubKey) {
            this.salesrepService.getSummary(res.supPubKey)
              .subscribe(
              res => {
                this.salesrep = res;
              },
              err => {
                this.message = err.status + " : " + err.statusText;
                this.message = this.message + " : " + err.json()["message"];      
              }
              );
          }
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
  }

  submit() {
    this.message = '';
    if (this.mode === 'Create') {
      let dojDate = this.salesRepFormGroup.get('doj').value.day + '/' + this.salesRepFormGroup.get('doj').value.month + '/' + this.salesRepFormGroup.get('doj').value.year;
      this.salesRepFormGroup.patchValue({ doj: dojDate });
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

  open(content) {
    this.modal = this.modalService.open(content);
    this.modal.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addSalesrep($event) {
    this.salesrep['pubKey'] = $event.pubKey;
    this.salesrep['fName'] = $event.fName;
    this.salesrep['mName'] = $event.mName;
    this.salesrep['lName'] = $event.lName;
    this.salesrep['mob'] = $event.mob;
    this.salesrep['email'] = $event.email;
    this.salesrep['desig'] = $event.desig;
    this.salesrep['land'] = $event.land;
    this.salesrep['extn'] = $event.extn;
    this.salesRepFormGroup.patchValue({
      supPubKey: this.salesrep['pubKey']
    });
  }

  removeSalesrep() {
    this.salesrep = {};
    this.salesRepFormGroup.patchValue({
      supPubKey: this.salesrep
    });
  }

}
