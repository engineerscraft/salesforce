import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CountryService {

  constructor(private httpService: HttpService) { }

  getCountries() {
    return this.httpService.callHttpGet("/resources/v1/country")
      .map(res => res.json());
  }
}
