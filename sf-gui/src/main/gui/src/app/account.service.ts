import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class AccountService {

  constructor(private httpService: HttpService) { }

  searchAccounts(searchString, startPosition) {
    return this.httpService.callHttpGet("/resources/v1/account?searchString=" + searchString + "&startPosition=" + startPosition)
      .map(res => res.json())
  }
}
