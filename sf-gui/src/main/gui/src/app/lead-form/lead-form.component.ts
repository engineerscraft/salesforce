import { Component, OnInit, Input, trigger, transition, style, animate } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LeadService } from '../lead.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-lead-form',
  templateUrl: './lead-form.component.html',
  styleUrls: ['./lead-form.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('500ms', style({transform: 'translateX(50%)', opacity: 0}))
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
    { pubKey: 'Item A', des: 'Item A', discType: 'percent', discAmt: 0 }, 
    { pubKey: 'Item B', des: 'Item A', discType: 'percent', discAmt: 0 }, 
    { pubKey: 'Item C', des: 'Item A', discType: 'percent', discAmt: 0 }, 
    { pubKey: 'Item D', des: 'Item A', discType: 'percent', discAmt: 0 }
  ];

  private contacts = [
    { pubKey: 'Item A', name: 'Item A' }, 
    { pubKey: 'Item B', name: 'Item A' }, 
    { pubKey: 'Item C', name: 'Item A' }, 
    { pubKey: 'Item D', name: 'Item A' }
  ];

  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private leadService: LeadService,
    private router: Router) { }

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
      divId: [0, [Validators.required]]
    });

    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.pubKey = params.get('pubKey');
      });

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
      if(this.products[i].pubKey === pubKey) {
        this.products.splice(i,1);
      }
    }
  }

  removeContact(pubKey) {
    let i = this.contacts.length
    while (i--) {
      if(this.contacts[i].pubKey === pubKey) {
        this.contacts.splice(i,1);
      }
    }
  }

  openProductDialog() {

  }

  openContactDialog() {

  }
}
