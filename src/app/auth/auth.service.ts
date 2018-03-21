import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  auth0 = new auth0.WebAuth({ 
    domain:   'go-pizza42.eu.auth0.com',
    clientID: '9A_RwMFtN1RPylDgkGL7z-1LOQUS1sTP'
  });

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

}
