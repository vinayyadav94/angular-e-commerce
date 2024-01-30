import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User, UsersResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users?: UsersResponse;
  userdetails?: User;

  constructor(
    private userService: UserService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe({
      next: usersResponse=>{
        this.users = usersResponse;
        console.log(this.users);
      },
      error: err=>{
        console.log(err);
      }
    })
  }

  openUserModal(content: any, user: User){
    this.modalService.open(content,{
      size:'md'
    })
    this.userdetails = user;
  }

}
