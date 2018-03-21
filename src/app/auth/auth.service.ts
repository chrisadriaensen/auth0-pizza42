import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  var webAuth = new auth0.WebAuth({ 
    domain:   'go-pizza42.eu.auth0.com',
    clientID: '9A_RwMFtN1RPylDgkGL7z-1LOQUS1sTP'
  });

  constructor(public router: Router) {}

  public login(): void {
    webAuth.authorize({
      connection: 'facebook'
    });
  }

}
