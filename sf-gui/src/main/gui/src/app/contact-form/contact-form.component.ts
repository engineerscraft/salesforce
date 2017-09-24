import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../country.service';
import { StateService } from '../state.service';
import { DistrictService } from '../district.service';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Router, Params, NavigationEnd } from '@angular/router';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() readOnly: boolean = null;
  @Input() mode = "Create";

  private contactFormGroup: FormGroup;
  private attr = '';
  private buttonName = 'Create';
  private locationLists = { countries: Array(), states: Array(), districts: Array() };
  private message = '';
  private pubKey;
  private formTitle = 'Contact Creation';


  constructor(private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private countryService: CountryService,
    private stateService: StateService,
    private districtService: DistrictService,
    private contactService: ContactService,
    private router: Router) { }

  ngOnInit() {

    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      window.scroll(0, 0);
    });

  if(this.mode === "View") {
      this.readOnly = true;
      this.formTitle = 'Contact Details';
    }

    this.contactFormGroup = this.formBuilder.group({

      contactSummary: this.formBuilder.group({
        coId: [''],
        pubKey: [''],
        fName: ['', [Validators.required]],
        mName: [''],
        lName: [''],
        company: [''],
        desig: ['', [Validators.required]],
        email: ['', [Validators.required]],
        mob: ['', [Validators.required]],
        land: [''],
        extn: ['']
      }),
      addrLine1: [''],
      addrLine2: [''],
      cId: [''],
      sId: [''],
      dId: [''],
      zipCode: [''],
      note: ['']
    });

    this.activatedRoute
      .paramMap
      .subscribe(params => {
        this.pubKey = params.get('pubKey');
      });

    if (this.pubKey) {
      this.contactService.readContact(this.pubKey)
        .subscribe(
        res => {
          this.contactFormGroup.setValue(res);
          if(this.contactFormGroup.value.cId) {
            this.onCountryChange(this.contactFormGroup.value.cId);
          }
          if(this.contactFormGroup.value.sId) {
            this.onStateChange(this.contactFormGroup.value.sId);
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

    this.countryService.getCountries().
      subscribe(
      res => {
        this.locationLists.countries = res;
      });


    if (this.mode === 'View') {

    }
  }

  onCountryChange(cId) {
    this.stateService.getStates(cId).
      subscribe(
      res => {
        this.locationLists.states = res;
      }
      );
  }

  onStateChange(sId) {
    this.districtService.getDistricts(sId).
      subscribe(
      res => {
        this.locationLists.districts = res;
      }
      );
  }

  submit() {
    this.message = '';
    if (this.mode === 'Create') {
      this.contactService.createContact(this.contactFormGroup.value)
        .subscribe(
        res => {
          this.router.navigate(['contactDetails/' + res.pubKey]);
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
