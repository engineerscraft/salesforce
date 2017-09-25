import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from './http.service';

@Injectable()
export class DivisionService {

  constructor(private httpService: HttpService) { }

  getDivisions() {
    return this.httpService.callHttpGet("/resources/v1/division")
      .map(res => res.json());
  }
}
