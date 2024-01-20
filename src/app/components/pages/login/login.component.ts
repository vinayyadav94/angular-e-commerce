import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginResponse } from 'src/app/models/loginResponse.model';
import { AuthService } from 'src/app/services/auth.service';
import { setLoginData } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private store: Store<{auth: loginResponse}>,
              private router: Router
              ) {
                // this.store.select('auth').subscribe({
                //   next: (data)=>{
                //     console.log(data);
                //   }
                // })
              }

  isFormValid = true;
  isSuccess = false;
  isError = false;
  errorMsg = '';

  formSubmit(event: SubmitEvent, loginForm: NgForm) {
    event.preventDefault();
    //validate
    this.isError = false;
    if(this.loginData.email.trim() === '' ||
     this.loginData.password.trim() ==='') {
      this.isFormValid = false;
      return;
    }
    this.authService.generateToken(this.loginData).subscribe({
      next:(res: loginResponse) => {
        this.isSuccess = true;
        this.isError = false;
        this.store.dispatch(setLoginData(res));
        this.router.navigate(['/user']);
      },
      error:(err) => {
        this.isError = true;
        this.errorMsg = err.error.message;
      }
    })
  }

  reset(loginForm: NgForm) {
    loginForm.resetForm();
    this.isFormValid = true;
    this.isError = false;
    this.isSuccess = false;
  }

}
