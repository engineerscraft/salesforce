import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class LeadService {

  constructor(private httpService: HttpService) { }

  readLead(pubKey) {

  }

  createLead(lead) {
    return this.httpService.callHttpPost("/resources/v1/lead", lead)
      .map(res => res.json())
  }
}
