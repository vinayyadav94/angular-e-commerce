import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  createProductWithCategory(product: Product) {
    return this.http.post<Product>(`${environment.baseUrl}/categories/${product.category.categoryId}/products`, 
    product);
  }

  //create product api without category(category would be null in this case)
  createProduct(product: Product) {
    return this.http.post<Product>(`${environment.baseUrl}/products`, 
    product);
  }

  uploadProductImage(productId: string, imageData: File) {
    const formData = new FormData();
    formData.append('productImage', imageData)
    return this.http.post(`${environment.baseUrl}/products/image/${productId}`, formData)
  }
}
