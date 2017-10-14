import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class OppService {

  constructor(private httpService: HttpService) { }
  
    readOpportunity(pubKey) {
      return this.httpService.callHttpGet("/resources/v1/opp/" + pubKey)
      .map(res => res.json())
    }
  
    createOpportunity(pubKey) {
      return this.httpService.callHttpPost("/resources/v1/opp", pubKey)
        .map(res => res.json())
    }
  
    modifyOpportunity(pubKey, opportunity) {
      return this.httpService.callHttpPut("/resources/v1/opp/" + pubKey, opportunity)
        .map(res => res.json())  
    }
  
    searchOpportunities(searchString, startPosition) {
      return this.httpService.callHttpGet("/resources/v1/opp?searchString=" + searchString + "&startPosition=" + startPosition)
        .map(res => res.json())
    }
  
}
