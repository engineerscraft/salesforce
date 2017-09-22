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
}
