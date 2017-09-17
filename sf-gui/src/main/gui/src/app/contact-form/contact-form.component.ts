import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../country.service';
import { StateService } from '../state.service';
import { DistrictService } from '../district.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() coId = '';
  @Input() pubKey = '';
  @Input() fName = '';
  @Input() mName = '';
  @Input() lName = '';
  @Input() company = '';
  @Input() desig = '';
  @Input() email = '';
  @Input() mob = '';
  @Input() land = '';
  @Input() extn = '';
  @Input() addrLine1 = '';
  @Input() addrLine2 = '';
  @Input() cId = '';
  @Input() sId = '';
  @Input() dId = '';
  @Input() zipCode = '';
  @Input() note = '';
  @Input() method = 'post';

  private contactFormGroup: FormGroup;
  private attr = '';
  private buttonName = 'Create';
  private locationLists = { countries: Array(), states: Array(), districts: Array() };

  constructor(private formBuilder: FormBuilder,
    private countryService: CountryService,
    private stateService: StateService,
    private districtService: DistrictService) { }

  ngOnInit() {
    this.contactFormGroup = this.formBuilder.group({
      coId: [this.coId, []],
      pubKey: [this.pubKey, []],
      fName: [this.fName, [Validators.required]],
      mName: [this.mName, []],
      lName: [this.lName, []],
      company: [this.company, [Validators.required]],
      desig: [this.desig, [Validators.required]],
      email: [this.email, [Validators.required]],
      mob: [this.mob, [Validators.required]],
      land: [this.land, []],
      extn: [this.extn, []],
      addrLine1: [this.addrLine1, []],
      addrLine2: [this.addrLine2, []],
      cId: [this.cId, []],
      sId: [this.sId, []],
      dId: [this.dId, []],
      zipCode: [this.zipCode, []],
      note: [this.note, []]
    });

    if (this.pubKey !== '') {
      this.buttonName = 'Modify';
    }

    this.countryService.getCountries().
      subscribe(
      res => {
        this.locationLists.countries = res;
      });
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
    if (this.coId !== '') {

    } else {

    }
  }

}
