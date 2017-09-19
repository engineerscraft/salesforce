import { Injectable } from '@angular/core';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';
import { HttpService } from './http.service';
import 'rxjs/add/observable/throw';

@Injectable()
export class ContactService {

  constructor(private httpService: HttpService) { }

  searchContacts(searchString, startPosition) {
    return this.httpService.callHttpGet("/resources/v1/contact?searchString=" + searchString + "&startPosition=" + startPosition)
      .map(res => res.json())
  }
}
