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

  constructor() {}

  ngOnInit(): void {

    this.accessToken = localStorage.getItem('access_token');
    this.idToken = localStorage.getItem('id_token');
    this.expiresAt = localStorage.getItem('expires_at');   

  }

}
