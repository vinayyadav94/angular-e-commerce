import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private httpClient: HttpClient) { }

  //signup logic
  signupUser(user: User) {
    return this.httpClient.post<User>(`${environment.baseUrl}/users`, user);
  }
}
