import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpService } from './http.service';

@Injectable()
export class StateService {

  constructor(private httpService: HttpService) { }

  getStates(cId) {
    return this.httpService.callHttpGet("/resources/v1/state?cId="+cId)
      .map(res => res.json());
  }
}
