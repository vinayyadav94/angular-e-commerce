import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { loginResponse } from '../models/loginResponse.model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private store: Store<{auth: loginResponse}>) { }

  generateToken(loginData: {email: string, password: string}) {
    return this.http.post<loginResponse>(`${environment.baseUrl}/auth/login`, loginData);
  }

  checkLoginAndNormalUser() {
    //this will check if user is loggedIn and role is normal
    //observable containing the login check status
    return this.store.select('auth').pipe(map(value => {

      const isNormalRole = value.user?.roles.find(
        (role) => role.roleName === 'ROLE_NORMAL'
      );

      if( value.login && value.jwtToken !== '' && value.user && isNormalRole) return true;
      else return false;
    }))
  }

  checkLoginAndAdminUser() {
    //check if user is loggedIn and role is admin
  }
 
  //helper methods for local storage
  saveLoginDataToLocalStorage(loginData: loginResponse) {
    localStorage.setItem('data', JSON.stringify(loginData));
  }

  static getLoginDataFromLocalStorage() {
    const dataString = localStorage.getItem('data');
    if(dataString) return JSON.parse(dataString);
    else return null;
  }

}
