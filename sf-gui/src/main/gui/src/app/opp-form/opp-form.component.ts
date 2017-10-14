import { Component, OnInit, Input, Output, trigger, transition, style, animate, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OppService } from '../opp.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DivisionService } from '../division.service';
import { AccountService } from '../account.service';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-opp-form',
  templateUrl: './opp-form.component.html',
  styleUrls: ['./opp-form.component.scss'],
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
export class OppFormComponent implements OnInit {

  @Input() readOnly: boolean = null;
  @Input() mode = "Create";
  @Output() changeView = new EventEmitter<any>();

  private opportunityFormGroup: FormGroup;
  private attr = '';
  private buttonName = 'Create';
  private message = '';
  private pubKey;
  private formTitle = 'Opportunity Creation';
  private products = [
  ];

  private contacts = [
  ];

  private account = {};

  private closeResult: string;
  private productInstance;
  private modal;
  private divisions;
  private possibleStatus;
  private showConversionControl = false;
  private rdOnly;

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private opportunityService: OppService,
    private router: Router,
    private modalService: NgbModal,
    private divisionService: DivisionService,
    private accountService: AccountService,
    private statusService: StatusService) { }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });

    if (this.mode === "View") {
      this.readOnly = true;
      this.formTitle = 'Opportunity Details';
    }

    this.opportunityFormGroup = this.formBuilder.group({
      opportunitySummary: this.formBuilder.group({
        pubKey: [''],
        title: ['', [Validators.required]],
        quotePrice: [0],
        statusPubKey: ['CREATED', [Validators.required]]
      }),
      discType: [1],
      discVal: [0],
      divPubKey: ['', [Validators.required]],
      accPubKey: [''],
      contacts: ['', [Validators.required]],
      prodInstances: ['', [Validators.required]],
      changeDes: ['']
    });

    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.pubKey = params.get('pubKey');
      });

    this.opportunityFormGroup.get("discType").valueChanges.debounceTime(400)
      .subscribe(
      res => {
        this.calculate();
      });
    this.opportunityFormGroup.get("discVal").valueChanges.debounceTime(400)
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
      },
      err => {
        this.message = err.status + " : " + err.statusText;
        this.message = this.message + " : " + err.json()["message"];
      }
      );

    if (this.pubKey) {
      this.opportunityService.readOpportunity(this.pubKey)
        .subscribe(
        res => {
          this.opportunityFormGroup.patchValue(res);
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
          if(res.readOnly) {
            this.rdOnly = true;
          }
          if (res.accPubKey) {
            this.accountService.getAccountSummary(res.accPubKey)
              .subscribe(
              res => {
                this.account = res;
              },
              err => {
                this.message = err.status + " : " + err.statusText;
                this.message = this.message + " : " + err.json()["message"];      
              }
              );
          }
          this.statusService.readStatus('OPPORTUNITY', res.opportunitySummary.statusPubKey)
            .subscribe(
            res => {
              this.possibleStatus = res;
              this.checkopportunityStatus();
            },
            err => {
              this.message = err.status + " : " + err.statusText;
              this.message = this.message + " : " + err.json()["message"];    
            }
            );
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
    this.opportunityFormGroup.patchValue({
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

    this.opportunityFormGroup.patchValue({
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

    if (this.opportunityFormGroup.value.discType === 1) {
      this.opportunityFormGroup.patchValue({
        opportunitySummary: {
          quotePrice: resultantQuotePrice - this.opportunityFormGroup.value.discVal
        }
      });
    } else {
      this.opportunityFormGroup.patchValue({
        opportunitySummary: {
          quotePrice: resultantQuotePrice - (resultantQuotePrice * this.opportunityFormGroup.value.discVal / 100)
        }
      });
    }
  }

  attachAccount($event) {
    this.account['pubKey'] = $event.pubKey;
    this.account['title'] = $event.title;
    this.opportunityFormGroup.patchValue({
      accPubKey: this.account['pubKey']
    });
  }

  removeAccount() {
    this.account = {};
    this.opportunityFormGroup.patchValue({
      account: this.account
    });
  }

  checkopportunityStatus() {
    this.showConversionControl = false;
    this.possibleStatus.forEach(function (status) {
      if (status.pubKey === this.opportunityFormGroup.get('opportunitySummary.statusPubKey').value && status.conv) {
        this.showConversionControl = true;
      }
    }.bind(this));
  }

  submit() {
    this.message = '';
    if (this.mode === 'Create') {
      this.opportunityService.createOpportunity(this.opportunityFormGroup.value).subscribe(
        data => {
          this.router.navigate(['opportunityDetails/' + data.pubKey]);
        },
        err => { 
          this.message = err.status + " : " + err.statusText;
          this.message = this.message + " : " + err.json()["message"];
        }
      );
    } else if (this.mode === 'View') {
      this.readOnly = null;
      this.buttonName = 'Save';
      this.mode = 'Modify';
    } else if (this.mode === 'Modify') {
      if (this.opportunityFormGroup.dirty) {
        this.opportunityService.modifyOpportunity(this.pubKey, this.opportunityFormGroup.value)
          .subscribe(
          res => {
            this.statusService.readStatus('OPPORTUNITY', this.opportunityFormGroup.get('opportunitySummary.statusPubKey').value)
              .subscribe(
              res => {
                this.possibleStatus = res;
                this.checkopportunityStatus();
              },
              err => {
                this.message = err.status + " : " + err.statusText;
                this.message = this.message + " : " + err.json()["message"];      
              }
              );
            this.cancel();
          },
          err => {
            this.message = err.status + " : " + err.statusText;
            this.message = this.message + " : " + err.json()["message"];  
          }
          );
      } else {
        this.cancel();
      }
    }
  }

  changeViewDisplay() {
    this.changeView.emit();
  }

}
