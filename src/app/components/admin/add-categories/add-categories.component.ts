import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent {

  constructor(private categoryService: CategoryService) {}

  category:  Category = new Category('','','','');
  errorMsg: string = '';
  isFormValid: boolean = true;
  isError: boolean = false;
  isSuccess: boolean = false;

  submitForm(event: SubmitEvent) {
    event.preventDefault();
    this.isFormValid = true;
    this.isError = false;
    this.isSuccess = false;
    if((this.category.title.trim() == '' || null) || (this.category.description.trim() == '' || null)) {
      this.isFormValid = false;
      return;
    } else {
    //submit the form to server
    this.categoryService.createCategory(this.category).subscribe({
      next: (res) => {
        console.log('category added',res);
        this.category = new Category('','','','');
        this.isSuccess = true;
      },
      error: (err) => {
        console.log('error',err);
        this.isError = true;
        this.errorMsg = err.error;
      }
    })
  }
  }

  reset(form: NgForm){
    this.isFormValid = true;
    this.isError = false;
    this.isSuccess = false;
    form.resetForm();
    this.category = new Category('','','','');
    console.log('*******',this.category)
  }
}
