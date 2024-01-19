import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { loginResponse } from '../models/loginResponse.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  generateToken(loginData: {email: string, password: string}) {
    return this.http.post<loginResponse>(`${environment.baseUrl}/auth/login`, loginData);
  }

}
