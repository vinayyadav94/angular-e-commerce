import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';
import { setCategoryData } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-product-categories-view',
  templateUrl: './product-categories-view.component.html',
  styleUrls: ['./product-categories-view.component.css']
})
export class ProductCategoriesViewComponent implements OnInit {

  categories: Category[] = [];
  constructor( 
    private catStore: Store<{cat: Category[]}>,
    private catService: CategoryService
    ){}
  
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(){
    this.catStore.select("cat").subscribe({
      next: categories => {
        if(categories.length > 0){
          console.log('categories is already there');
          this.categories = categories;
        }else{
          console.log('no categories.. load from server')
          this.catService.getCategories().subscribe({
            next: (categories) => {
              this.categories = categories.content;
              //add this data to store
              this.catStore.dispatch(setCategoryData({categories: this.categories}))
            }
          })
        }
      }
    })
  }
}
