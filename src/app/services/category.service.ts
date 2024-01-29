import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http: HttpClient,
    private catStore: Store<{cat: Category[]}>) { }

  createCategory(category: Category) {
    return this.http.post<Category>(`${environment.baseUrl}/categories`, category);
  }

  getCategories() {
    return this.http.get<CategoryResponse>(`${environment.baseUrl}/categories?pageSize=${environment.MAX_PAGE_SIZE}`)
  }

  deleteCategory(categoryId: string) {
    return this.http.delete(`${environment.baseUrl}/categories/${categoryId}`);
  }

  updateCategory(category: Category) {
    return this.http.put<Category>(`${environment.baseUrl}/categories/${category.categoryId}`, 
    category);
  }

  getCategoriesFromStore(){
    return this.catStore.select('cat');
  }
}
