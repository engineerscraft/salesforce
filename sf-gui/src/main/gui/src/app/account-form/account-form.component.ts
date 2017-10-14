import { Component, OnInit, Input, Output, trigger, transition, style, animate, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DivisionService } from '../division.service';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss'],
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
export class AccountFormComponent implements OnInit {

  @Input() readOnly: boolean = null;
  @Input() mode = "Modify";
  @Output() changeView = new EventEmitter<any>();

  private accountFormGroup: FormGroup;
  private attr = '';
  private buttonName = 'Modify';
  private message = '';
  private pubKey;
  private formTitle = 'Account Modification';
  private products = [
  ];

  private contacts = [
  ];

  private leads = [
  ];

  private opportunities = [
  ];

  private closeResult: string;
  private productAccount;
  private modal;
  private divisions;
  private discUnit

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private router: Router,
    private modalService: NgbModal,
    private divisionService: DivisionService) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });

    if (this.mode === "View") {
      this.readOnly = true;
      this.formTitle = 'Account Details';
    }

    this.accountFormGroup = this.formBuilder.group({
      accountSummary: this.formBuilder.group({
        pubKey: [''],
        title: ['', [Validators.required]],
        soldPrice: [0]
      }),
      statusId: ['1'],
      divPubKey: ['', [Validators.required]],
      contacts: ['', [Validators.required]],
      prodAccount: ['', [Validators.required]],
      leads: ['', [Validators.required]],
      opportunities: ['', [Validators.required]],
      changeDes: ['']
    });

    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.pubKey = params.get('pubKey');
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
      this.accountService.readAccount(this.pubKey)
        .subscribe(
        res => {
          this.accountFormGroup.patchValue(res);
          this.products = res.prodAccount;
          this.contacts = res.contacts;
          this.leads = res.leads;
          this.opportunities = res.opportunities;
          for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].discType === 2)
              this.discUnit = '%';
          }
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
    this.accountFormGroup.patchValue({
      contacts: this.contacts
    });
  }

  submit() {
    this.message = '';
    if (this.mode === 'View') {
      this.readOnly = null;
      this.buttonName = 'Save';
      this.mode = 'Modify';
    } else if (this.mode === 'Modify') {
      if (this.accountFormGroup.dirty) {
        this.accountService.modifyAccount(this.pubKey, this.accountFormGroup.value)
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
      } else {
        this.cancel();
      }
    }
  }

  changeViewDisplay() {
    this.changeView.emit();
  }

}
