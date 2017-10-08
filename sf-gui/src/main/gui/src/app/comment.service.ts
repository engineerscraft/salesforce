import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable()
export class CommentService {

  constructor(private httpService: HttpService) { }

  getComments(pubKey, startPos) {
    return this.httpService.callHttpGet('/resources/v1/comment?pubKey=' + pubKey +'&startPosition=' + startPos)
      .map(res => res.json());
  }

  createComment(comment) {
    return this.httpService.callHttpPost('/resources/v1/comment',comment)
    .map(res => res.json());
  }
}
