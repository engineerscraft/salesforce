import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LeadService {

  constructor(private httpService: HttpService, private http: Http, private router: Router) { }

  handleError(response: Response) {
    if (response.status === 401 && response.json()["message"] !== "Refresh token expired") {
      this.router.navigate(['forbidden']);
    }
    return Observable.throw(response);;

  }

  search() {
    return this.httpService.callHttpGet("https://jsonplaceholder.typicode.com/posts")
      .map(res => res.json())
      .catch((response: Response) => {
        return this.handleError(response);
      });

  }

}
