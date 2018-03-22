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

    accessToken = localStorage.getItem('access_token');
    idToken = localStorage.getItem('id_token');
    expiresAt = localStorage.getItem('expires_at');   

  }

}
