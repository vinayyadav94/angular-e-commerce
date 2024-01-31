import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
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
  loading = false;
  pageNumber: number = 0;

  constructor(
    private userService: UserService,
    private modalService: NgbModal) {}

  ngOnInit(): void {
    this.loadPaginatedUsers(0);
  }

  loadPaginatedUsers(
    pageNumber=0,
    pageSize=10,
    sortBy='name',
    sortDir='asc'
    ){
      this.loading = true;
      this.userService.getUsers(pageNumber,pageSize,sortBy,sortDir).subscribe({
        next: (usersResponse)=>{
          if(usersResponse.pageNumber > 0){
            this.users = {
              ...usersResponse,
              content: [...this.users!.content, ...usersResponse.content]
            }
          }else{
            this.users = usersResponse;
            console.log(this.users);
          }
          this.loading = false;
          console.log(usersResponse);
        },
        error: err=>{
          console.log(err);
          this.loading = false;
        }
      })
    }

  openUserModal(content: any, user: User){
    this.modalService.open(content,{
      size:'md'
    })
    this.userdetails = user;
  }

  userScrolled(){
    setTimeout(()=>{
      console.log('*******scrolled...');
    if(this.loading || this.users?.lastPage){
      return;
    }
    //load the data of other page
    this.pageNumber += 1;
    this.loadPaginatedUsers(this.pageNumber);
    },200);
  }

}
