import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category.model';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}
  
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next:(res) => {
        this.categories = res.content;
      }
    })
  }
}
