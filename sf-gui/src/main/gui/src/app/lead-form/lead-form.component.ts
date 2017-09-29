import { Component, OnInit, Input, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../lead.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DivisionService } from '../division.service';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(50%)', opacity: 0 }))
      ])
    ]),
  ]

})
export class LeadFormComponent implements OnInit {

  @Input() readOnly: boolean = null;
  @Input() mode = "Create";

  private leadFormGroup: FormGroup;
  private attr = '';
  private buttonName = 'Create';
  private message = '';
  private pubKey;
  private formTitle = 'Lead Creation';
  private products = [
  ];

  private contacts = [
  ];

  private closeResult: string;
  private productInstance;
  private modal;
  private divisions;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private leadService: LeadService,
    private router: Router,
    private modalService: NgbModal,
    private divisionService: DivisionService) { }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });

    if (this.mode === "View") {
      this.readOnly = true;
      this.formTitle = 'Lead Details';
    }

    this.leadFormGroup = this.formBuilder.group({
      leadId: [''],
      pubKey: [''],
      title: ['', [Validators.required]],
      discType: [1],
      discVal: [0],
      quotePrice: [0],
      statusId: [0, [Validators.required]],
      divPubKey: [0, [Validators.required]]
    });

    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.pubKey = params.get('pubKey');
      });

    this.leadFormGroup.get("discType").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
    this.leadFormGroup.get("discVal").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
    this.divisionService.getDivisions()
      .subscribe(
      data => {
        this.divisions = data;
        let i = this.divisions.length
        while (i--) {
          if (this.divisions[i].pubKey === 'ALL') {
            this.divisions.splice(i, 1);
          }
        }
      }
      );



    /*if (this.pubKey) {
      this.leadService.readLead(this.pubKey)
        .subscribe(
        res => {
          this.contactFormGroup.setValue(res);
          if (this.contactFormGroup.value.cId) {
            this.onCountryChange(this.contactFormGroup.value.cId);
          }
          if (this.contactFormGroup.value.sId) {
            this.onStateChange(this.contactFormGroup.value.sId);
          }
        },
        err => {
          this.message = err.status + " : " + err.statusText;
          this.message = this.message + " : " + err.json()["message"];
        }
        );
    }*/

    if (this.pubKey) {
      this.buttonName = 'Modify';
    }

    if (this.mode === 'View') {

    }
  }


  submit() {
    this.message = '';
    if (this.mode === 'Create') {
      /*      this.contactService.createContact(this.contactFormGroup.value)
              .subscribe(
              res => {
                this.router.navigate(['leadDetails/' + res.pubKey]);
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
            this.contactService.updateContact(this.pubKey, this.contactFormGroup.value)
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
              );*/
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

  removeProd(pubKey) {
    let i = this.products.length
    while (i--) {
      if (this.products[i].pubKey === pubKey) {
        this.products.splice(i, 1);
      }
    }
    this.calculate();
  }

  removeContact(pubKey) {
    let i = this.contacts.length
    while (i--) {
      if (this.contacts[i].pubKey === pubKey) {
        this.contacts.splice(i, 1);
      }
    }
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

  addContact($event) {
    this.contacts.push({
      pubKey: $event.pubKey,
      name: $event.name,
      mob: $event.mob,
      email: $event.email,
      company: $event.company,
      desig: $event.desig,
      land: $event.land,
      extn: $event.extn
    });
  }

  addProduct($event) {
    this.products.push({
      pubKey: $event.pubKey,
      des: $event.des,
      quotePrice: $event.price,
      actualUnitPrice: $event.price,
      discType: 1,
      discVal: 0,
      quoteUnitPrice: $event.price,
      unit: 1,
      discUnit: ''
    });
    this.calculate();
  }

  editProductInstance($event) {
    this.products.forEach(function (prod) {
      if (prod.pubKey === $event.pubKey) {
        prod.quotePrice = $event.quotePrice;
        prod.actualUnitPrice = $event.actualUnitPrice;
        prod.discType = $event.discType;
        prod.discVal = $event.discVal;
        prod.quoteUnitPrice = $event.quoteUnitPrice;
        prod.unit = $event.unit;
        prod.discUnit = $event.discUnit;
      }
    });
    this.modal.close();
    this.calculate();
  }

  calculate() {
    let totalQuotePrice = 0;
    this.products.forEach(function (prod) {
      totalQuotePrice = totalQuotePrice + prod.quotePrice;
    });

    if (this.leadFormGroup.value.discType === 1) {
      this.leadFormGroup.patchValue({
        quotePrice: totalQuotePrice - this.leadFormGroup.value.discVal
      });
    } else {
      this.leadFormGroup.patchValue({
        quotePrice: totalQuotePrice - (totalQuotePrice * this.leadFormGroup.value.discVal / 100)
      });
    }
  }
}
