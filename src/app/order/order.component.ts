import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order: any;

  constructor(public http: HttpClient) {}

  ngOnInit() {
   
    this.http.get('http://pizza42-auth0.herokuapp.com/api/order', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    }).subscribe(
      data => this.order = data
    );

  }

}
