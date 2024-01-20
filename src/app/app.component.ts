import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginResponse } from './models/loginResponse.model';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private store: Store<{auth: loginResponse}>,
              private authService: AuthService) {
    this.store.select('auth').subscribe({
      next: loginData => {
        this.authService.saveLoginDataToLocalStorage(loginData);
      }
    })
  }

  title = 'angular-e-commerce';
}
