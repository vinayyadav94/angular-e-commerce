import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UsersResponse } from '../models/user.model';
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

  getUserImageUrl(userId: string){
    //use new Date().getTime() to update image in real time
    return `${environment.baseUrl}/users/image/${userId}?${new Date().getTime()}`;
  }

  //get all user
  getUsers(){
    return this.httpClient.get<UsersResponse>(`${environment.baseUrl}/users`);
  }

  //get single user
  getUser(userId: string){
    return this.httpClient.get(`${environment.baseUrl}/users/${userId}`);
  }

  //update user
  updateUser(user: User){
    return this.httpClient.put<User>(
      `${environment.baseUrl}/users/${user.userId}`, 
      user
    );
  }

  deleteUser(userId: string){
    return this.httpClient.delete(`${environment.baseUrl}/users/${userId}`);
  }

  //get user by email id
  getUserByEmailId(emailId: string){
    return this.httpClient.get(`${environment.baseUrl}/users/email/${emailId}`);
  }

  uploadUserImage(userId: string, userImage: File){

    let formdata = new FormData();
    formdata.append('userImage', userImage);

    return this.httpClient.post(
      `${environment.baseUrl}/users/image/${userId}`,
      formdata
      )
  }

  searchuser(query: string){
    return this.httpClient.get(`${environment.baseUrl}/users/search/${query}`);
  }


}
