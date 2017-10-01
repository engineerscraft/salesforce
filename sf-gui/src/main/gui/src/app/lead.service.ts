import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class LeadService {

  constructor(private httpService: HttpService) { }

  readLead(pubKey) {
    return this.httpService.callHttpGet("/resources/v1/lead/" + pubKey)
    .map(res => res.json())
  }

  createLead(lead) {
    return this.httpService.callHttpPost("/resources/v1/lead", lead)
      .map(res => res.json())
  }

  modifyLead(pubKey, lead) {
    return this.httpService.callHttpPut("/resources/v1/lead/" + pubKey, lead)
      .map(res => res.json())  
  }
}
