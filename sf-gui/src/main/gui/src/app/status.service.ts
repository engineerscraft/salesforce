import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class StatusService {

  constructor(private httpService: HttpService) { }

  readStatus(entity, currentStatusPubKey) {
    return this.httpService.callHttpGet("/resources/v1/status?entity=" + entity + "&currentStatusPubKey=" + currentStatusPubKey)
      .map(res => res.json())
  }
}
