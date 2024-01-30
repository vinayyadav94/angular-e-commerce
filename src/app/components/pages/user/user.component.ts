import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { loginResponse } from 'src/app/models/loginResponse.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { setLoginData } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {

  user?: User;
  loginResponse?: loginResponse;

  previewImageUrl?: string;
  imageFile?: File

  constructor(
    private authService: AuthService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private userService: UserService,
    private authStore: Store<{auth: loginResponse}>){
    this.authService.getLoggedInData().subscribe({
      next: loginData=>{
        this.user = {...loginData.user} as User;
        this.loginResponse = loginData;
      }
    })
  }

  openUpdateModal(content: any){
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg'
    });
  }

  onFileChange(event:any){
    // Handle file change event and assign the selected file to the property
    console.log(event);
    this.imageFile = (event.target as HTMLInputElement).files![0]
    console.log(this.imageFile);
    if(
      this.imageFile.type == 'image/jpg' ||
      this.imageFile.type == 'image/jpeg'
      ){
        //preview file
        const reader = new FileReader();
        reader.onload = () => {
          this.previewImageUrl = reader.result as string;
        };
        reader.readAsDataURL(this.imageFile);
        //upload file
      }else{
        this.toastr.error('Only jpg or jpeg are allowed!');
        this.imageFile = undefined;
      }
  }

  updateProfile(event: Event){
    event.preventDefault();
    if(this.user?.name.trim() === ''){
      this.toastr.error('Name is required');
      return
    }
    if(this.user?.about.trim() === ''){
      this.toastr.error('About is required');
      return
    }
    if(this.user?.password.trim() === ''){
      this.toastr.error('Password is required');
      return
    }

    this.userService.updateUser(this.user as User).subscribe({
      next: newUser=>{
        console.log(newUser);
        //update store to latest updated data
        const newLoginResponse = {
          jwtToken: this.loginResponse?.jwtToken,
          user: newUser,
          login: this.loginResponse?.login
        }
        this.authStore.dispatch(setLoginData(newLoginResponse as loginResponse))
        this.toastr.success(`${this.user?.name}'s profile has been successfully updated!`);
        //call image upload api if new image is selected
        if(this.imageFile){
          this.userService.uploadUserImage(this.user!.userId, this.imageFile).subscribe({
            next: (data: any)=>{
              console.log(data);
              console.log(this.user);
              //below again we are dispatching the same action because in case of image upload fail the above user status will be changed.
              this.user!.imageName = data.imageName;
              const newLoginResponse = {
                jwtToken: this.loginResponse?.jwtToken,
                user: {...this.user, imageName: data.imageName},
                login: this.loginResponse?.login
              }
              this.authStore.dispatch(
                setLoginData(newLoginResponse as loginResponse)
                );
              this.toastr.success(`${this.user?.name}'s photo has been successfully updated!`);
              this.imageFile = undefined;
              this.previewImageUrl = '';
            },
            error: err=>{
              this.toastr.error('some error occured while updating photo!');
            }
          })
        }
      },
      error: err=>{
        console.log(err);
        this.toastr.error('Some error occurred while updating profile!');
      }
    })
  }

}
