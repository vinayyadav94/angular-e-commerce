import { Injectable } from '@angular/core';
import { Category, CategoryResponse } from '../models/category.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createCategory(category: Category) {
    return this.http.post<Category>(`${environment.baseUrl}/categories`, category);
  }

  getCategories() {
    return this.http.get<CategoryResponse>(`${environment.baseUrl}/categories?pageSize=${environment.MAX_PAGE_SIZE}`)
  }
}
