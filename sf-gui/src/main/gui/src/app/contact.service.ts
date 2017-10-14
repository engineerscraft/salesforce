import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class ContactService {

  constructor(private httpService: HttpService) { }

  searchContacts(searchString, startPosition) {
    return this.httpService.callHttpGet("/resources/v1/contact?searchString=" + searchString + "&startPosition=" + startPosition)
      .map(res => res.json())
  }

  createContact(contact) {
    return this.httpService.callHttpPost("/resources/v1/contact", contact)
      .map(res => res.json())
  }

  readContact(pubKey) {
    return this.httpService.callHttpGet("/resources/v1/contact/" + pubKey)
      .map(res => res.json())
  }

  updateContact(pubKey, contact) {
    return this.httpService.callHttpPut("/resources/v1/contact/" + pubKey, contact)
      .map(res => res.json())  
  }

  getAllCount() {
    return this.httpService.callHttpGet("/resources/v1/count")
      .map(res => res.json())
  }
}
