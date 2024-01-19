import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { right } from '@popperjs/core';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  isFormValid = true;
  isSuccess = false;
  isError = false;
  isLoading = false;
  user = new User('','','','male','');

  constructor(private toastr: ToastrService,
              private userService: UserService) {}

  formSubmit(event:SubmitEvent, signupForm:NgForm) {
    event.preventDefault();
    if(signupForm.valid) {
      this.isLoading = true;
      //submit the form
      this.userService.signupUser(this.user)
      .subscribe({
        next:(user) => {
          //success
          this.isSuccess = true;
          this.user = new User('','','','male','');
          signupForm.resetForm();
          this.isError = false;
        },
        error:(error) => {
          //error
          this.isFormValid = true;
          this.isError = true;
          this.isLoading = false;
        },
        complete:() =>{
          //complete
          this.isLoading = false;
        }
      })
    } else {
      this.isFormValid = false;
      //this.toastr.error('Form is not valid!!','',{positionClass: 'toast-top-right'})
    }
  }

  reset(signupForm: NgForm) {
    //signupForm.resetForm();
    this.user = new User('','','','male','');
    this.isFormValid = true;
    this.isSuccess = false;
    this.isError = false;
  }

}
