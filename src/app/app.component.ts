import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements {
  title = 'Pizza 42';

  var apiToken;
  
  constructor(public auth: AuthService) {
    this.auth.handleAuthentication();
  }

}
