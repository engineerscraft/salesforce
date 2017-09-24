import { Injectable } from '@angular/core';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { HttpService } from './http.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class SalesrepService {

  constructor(private httpService: HttpService) { }

  searchSalesreps(searchString, startPosition) {
    return this.httpService.callHttpGet("/resources/v1/salesrep?searchString=" + searchString + "&startPosition=" + startPosition)
      .map(res => res.json())
  }

  createSalesRep(salesRep) {
    return this.httpService.callHttpPost("/resources/v1/salesrep", salesRep)
      .map(res => res.json())
  }

  readSalesRep(pubKey) {
    return this.httpService.callHttpGet("/resources/v1/salesrep/" + pubKey)
      .map(res => res.json())
  }

  updateSalesRep(pubKey, salesRep) {
    return this.httpService.callHttpPut("/resources/v1/salesrep/" + pubKey, salesRep)
      .map(res => res.json())  
  }
}
