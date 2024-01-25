import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories: Category[] = [];
  selectedCategory?: Category;
  updateView = false;

  constructor(private categoryService: CategoryService, 
              private modalService: NgbModal,
              private toastr: ToastrService) {}
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next:(res) => {
        this.categories = res.content;
      }
    })
  }

  open(content: any, category: any) {
    this.selectedCategory = {...category};
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
    .result.then(
			(result) => {
				//console.log(result)
			},
		)
    .catch((error)=>{
      //console.log(error)
    })
    .finally(()=>{
      this.updateView = false;
    });
	}

  deleteCategory(categoryToDelete?: Category) {
    this.categoryService.deleteCategory(categoryToDelete!.categoryId).subscribe({
      next:(res:any) => {
        this.toastr.success(res.message);
        this.modalService.dismissAll();
        this.categories = this.categories.filter(
          (cat) => cat.categoryId != this.selectedCategory?.categoryId
        )
      },
      error:(err:any) => {
        this.toastr.error(err.message);
      }
    })
  }

  toggleUpdateView() {
    this.updateView = !this.updateView;
  }

  saveSelectedCategory() {
    this.categoryService.updateCategory(this.selectedCategory!).subscribe({
      next: (res)=>{
        console.log(res);
        this.toastr.success(`${this.selectedCategory?.title} category has been updated.`)
        //update new category array
        this.categories = this.categories.map(cat => {
          if(cat.categoryId === this.selectedCategory?.categoryId) {
            cat.title = res.title;
            cat.description = res.description
            cat.coverImage = res.coverImage;
            return cat;
          }
          return cat;
        })
      },
      error: (err)=>{
        console.log(err);
        this.toastr.error('something went wrong...')
      }
    })
  }

}
