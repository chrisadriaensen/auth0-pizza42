import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;

  constructor(public http: HttpClient) {}

  ngOnInit() {
   
    this.http.get('http://pizza42-auth0.herokuapp.com/api/orders', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
    }).pipe(
      map(res => res.json()),
      catchError(error => console.log(error))
    ).subscribe(
      data => this.orders = data.message,
      error => this.orders = error
    );

  }

}
