import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AccountService {

  constructor(private httpService: HttpService) { }

  searchAccounts(searchString, startPosition) {
    return this.httpService.callHttpGet("/resources/v1/account?searchString=" + searchString + "&startPosition=" + startPosition)
      .map(res => res.json())
  }

  getAccountSummary(pubKey) {
    return this.httpService.callHttpGet("/resources/v1/account/summary/" + pubKey)
      .map(res => res.json())  
  }

  readAccount(pubKey) {
    return this.httpService.callHttpGet("/resources/v1/account/" + pubKey)
    .map(res => res.json())
  }

  modifyAccount(pubKey, account) {
    return this.httpService.callHttpPut("/resources/v1/account/" + pubKey, account)
      .map(res => res.json())  
  }
}
