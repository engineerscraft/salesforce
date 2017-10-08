import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CommentService {

  constructor(private httpService: HttpService) { }

  getComments(pubKey) {
    return this.httpService.callHttpGet("/resources/v1/comment" + "?pubKey=" + pubKey +"&startPosition=0")
      .map(res => res.json())
  }
}
