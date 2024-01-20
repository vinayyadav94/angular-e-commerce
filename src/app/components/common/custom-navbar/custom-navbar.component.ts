import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginResponse } from 'src/app/models/loginResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { removeLoginData } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-custom-navbar',
  templateUrl: './custom-navbar.component.html',
  styleUrls: ['./custom-navbar.component.css']
})
export class CustomNavbarComponent {

  collapse =true;
  loginData?: loginResponse;

  constructor(private authService: AuthService,
              private store: Store<{auth: loginResponse}>,
              private router: Router) {

    this.authService.getLoggedInData().subscribe({
      next: loggedInData => {
        this.loginData = loggedInData;
        console.log('******',this.loginData)
      }
    });
  }
  
  toggle() {
    this.collapse = !this.collapse;
  }

  logout() {
    this.store.dispatch(removeLoginData());
    this.router.navigate(['/login']);
  }

}
