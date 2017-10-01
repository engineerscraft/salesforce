import { Component, OnInit, Input, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../lead.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DivisionService } from '../division.service';
import { AccountService } from '../account.service';

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

  private account = {};

  private closeResult: string;
  private productInstance;
  private modal;
  private divisions;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private leadService: LeadService,
    private router: Router,
    private modalService: NgbModal,
    private divisionService: DivisionService,
    private accountService: AccountService) { }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });

    if (this.mode === "View") {
      this.readOnly = true;
      this.formTitle = 'Lead Details';
    }

    this.leadFormGroup = this.formBuilder.group({
      leadSummary: this.formBuilder.group({
        pubKey: [''],
        title: ['', [Validators.required]],
        quotePrice: [0],
      }),
      statusPubKey: [''],
      discType: [1],
      discVal: [0],
      divPubKey: ['', [Validators.required]],
      accPubKey: [''],
      contacts: ['', [Validators.required]],
      prodInstances: ['', [Validators.required]]
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

    if (this.pubKey) {
      this.leadService.readLead(this.pubKey)
        .subscribe(
        res => {
          this.leadFormGroup.setValue(res);
          this.products = res.prodInstances;
          this.contacts = res.contacts
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].discType === 2)
              this.products[i].discUnit = '%';
            if (this.products[i].discType === 1) {
              this.products[i].totalQuotePrice = (this.products[i].actualPrice - this.products[i].discVal) * this.products[i].unit;
            } else {
              this.products[i].totalQuotePrice = (this.products[i].actualPrice - (this.products[i].actualPrice * this.products[i].discVal / 100)) * this.products[i].unit;
            }
          }
          this.accountService.getAccountSummary(res.accPubKey)
            .subscribe(
              res => {
                this.account = res;
              }
            );
        }
        ,
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
    this.updateProduct();
  }

  removeContact(pubKey) {
    let i = this.contacts.length
    while (i--) {
      if (this.contacts[i].pubKey === pubKey) {
        this.contacts.splice(i, 1);
      }
    }
    this.updateContact();
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
      fName: $event.fName,
      mName: $event.mName,
      lName: $event.lName,
      mob: $event.mob,
      email: $event.email,
      company: $event.company,
      desig: $event.desig,
      land: $event.land,
      extn: $event.extn
    });
    this.updateContact();
  }

  updateContact() {
    this.leadFormGroup.patchValue({
      contacts: this.contacts
    });
  }

  addProduct($event) {
    this.products.push({
      pubKey: $event.pubKey,
      des: $event.des,
      totalQuotePrice: $event.actualPrice,
      actualPrice: $event.actualPrice,
      discType: 1,
      discVal: 0,
      quotePrice: $event.actualPrice,
      unit: 1,
      discUnit: ''
    });
    this.calculate();
    this.updateProduct();
  }

  updateProduct() {
    let addedProducts = [];
    this.products.forEach(function (product) {
      addedProducts.push({
        pubKey: product.pubKey,
        quotePrice: product.quotePrice,
        discType: product.discType,
        discVal: product.discVal,
        unit: product.unit,
        actualPrice: product.actualPrice
      });
    }.bind(this));

    this.leadFormGroup.patchValue({
      prodInstances: addedProducts
    });
  }

  editProductInstance($event) {
    this.products.forEach(function (prod) {
      if (prod.pubKey === $event.pubKey) {
        prod.totalQuotePrice = $event.totalQuotePrice;
        prod.actualPrice = $event.actualPrice;
        prod.discType = $event.discType;
        prod.discVal = $event.discVal;
        prod.quotePrice = $event.quotePrice;
        prod.unit = $event.unit;
        prod.discUnit = $event.discUnit;
      }
    });
    this.modal.close();
    this.calculate();
    this.updateProduct();
  }

  calculate() {
    let resultantQuotePrice = 0;
    this.products.forEach(function (prod) {
      resultantQuotePrice = resultantQuotePrice + prod.totalQuotePrice;
    });

    if (this.leadFormGroup.value.discType === 1) {
      this.leadFormGroup.patchValue({
        leadSummary: {
          quotePrice: resultantQuotePrice - this.leadFormGroup.value.discVal
        }
      });
    } else {
      this.leadFormGroup.patchValue({
        leadSummary: {
          quotePrice: resultantQuotePrice - (resultantQuotePrice * this.leadFormGroup.value.discVal / 100)
        }
      });
    }
  }

  attachAccount($event) {
    this.account['pubKey'] = $event.pubKey;
    this.account['title'] = $event.title;
    this.leadFormGroup.patchValue({
      accPubKey: this.account['pubKey']
    });
  }

  removeAccount() {
    this.account = {};
    this.leadFormGroup.patchValue({
      account: this.account
    });
  }

  submit() {
    this.leadService.createLead(this.leadFormGroup.value).subscribe(
      data => { },
      err => { }
    );
  }
}
