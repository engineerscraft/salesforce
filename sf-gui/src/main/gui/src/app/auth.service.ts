import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  constructor() { }

  login(credentials: Object, successCallback, errorCallback, newPasswordCallback) {

    successCallback("");
  }
}
