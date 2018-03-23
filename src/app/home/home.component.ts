import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  accessToken: any;
  idToken: any;
  expiresAt: any;
  scopes: any;

  constructor() {}

  ngOnInit(): void {

    this.accessToken = localStorage.getItem('access_token');
    if (this.accessToken) this.accessToken = atob(this.accessToken);
    this.idToken = atob(localStorage.getItem('id_token'));
    if (this.idToken) this.idToken = atob(this.idToken);
    this.expiresAt = localStorage.getItem('expires_at');   
    this.scopes = localStorage.getItem('scopes');

  }

}
