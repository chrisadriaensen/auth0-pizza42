import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { filter, mergeMap } from 'rxjs/operators';
import { Observable } from "rxjs/Rx"
import * as auth0 from 'auth0-js';

@Injectable()
export class AuthService {

  requestedScopes: string = 'openid profile email order';

  auth0 = new auth0.WebAuth({ 
    domain:   'chrisadriaensen.eu.auth0.com',
    clientID: 'JI5Asi1HnSAlKTcVPVGnZXIwRk9QsP1o',
    responseType: 'token id_token',
    audience: 'http://pizza42-auth0.herokuapp.com/api/',
    redirectUri: 'http://pizza42-auth0.herokuapp.com',
    scope: this.requestedScopes
  });
  
  userProfile: any;
  refreshSub: any;

  constructor(public router: Router) {}

  public login(): void {
    this.auth0.authorize();
  }

  public handleAuthentication(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this.setSession(authResult);
        this.router.navigate(['/profile']);
      } else if (err) {
        this.router.navigate(['/']);
        console.log(err);
      }
    });
  }

  private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    const scopes = authResult.scope || this.requestedScopes || '';
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('scopes', JSON.stringify(scopes));
    this.scheduleRenewal();
  }

  public logout(): void {
    // Remove tokens and expiry time from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('scopes');
    this.unscheduleRenewal();
    // Go back to the home route
    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access Token must exist to fetch profile');
    }    

    const self = this;
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        self.userProfile = profile;
      }

      cb(err, profile);
    });

  }

  public renewToken() {
    this.auth0.checkSession({}, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        this.setSession(result);
      }
    });
  }

  public scheduleRenewal() {
    if (!this.isAuthenticated()) { return; }
    this.unscheduleRenewal();

    const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));

    const expiresIn$ = Observable.of(expiresAt).pipe(
      mergeMap(
        expiresAt => {
          const now = Date.now();
          // Use timer to track delay until expiration
          // to run the refresh at the proper time
          return Observable.timer(Math.max(1, expiresAt - now));
        }
      )
    );

    // Once the delay time from above is
    // reached, get a new JWT and schedule
    // additional refreshes
    this.refreshSub = expiresIn$.subscribe(
      () => {
        this.renewToken();
        this.scheduleRenewal();
      }
    );
  }

  public unscheduleRenewal() {
    if (this.refreshSub) {
      this.refreshSub.unsubscribe();
    }
  }

  public userHasScopes(scopes: Array<string>): boolean {
    const grantedScopes = JSON.parse(localStorage.getItem('scopes')).split(' ');
    return scopes.every(scope => grantedScopes.includes(scope));
  }

}
