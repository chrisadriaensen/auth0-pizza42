import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Pizza 42';

  apiToken = any;
  
  constructor(public auth: AuthService, public http: HttpClient) {
    this.auth.handleAuthentication();
  }

  ngOnInit(): void {

    this.http.post('https://go-pizza42.eu.auth0.com/oauth/token', {

        client_id: '3nEw4IGHoTUJpIfUPKT24zDNGRuZvLtK',
        client_secret: 'kq4X6PEvzl4bLVIWtLQsoEyUxLyfZ0-PABDs0xk6n7uengrcZJDLqxDEHTduPTea',
        audience: 'http://pizza42-auth0.herokuapp.com/api/',
        grant_type: 'client_credentials'

      }).subscribe(

        res => { apiToken = res.access_token; }

    );

  }

}
