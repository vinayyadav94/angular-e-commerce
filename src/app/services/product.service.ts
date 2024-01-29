import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../models/product.model';
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
  createProduct(product: any) {
    return this.http.post<Product>(`${environment.baseUrl}/products`, 
    product);
  }

  uploadProductImage(productId: string, imageData: File) {
    const formData = new FormData();
    formData.append('productImage', imageData)
    return this.http.post(`${environment.baseUrl}/products/image/${productId}`, formData)
  }

  getLiveProducts(
    pageNumber=0, 
    pageSize=10, 
    sortBy='title', 
    sortDir='asc') {
    return this.http.get<ProductsResponse>(
      `${environment.baseUrl}/products/live?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
      )
  }

  getAllProducts(
    pageNumber=0, 
    pageSize=10, 
    sortBy='title', 
    sortDir='asc') {
    return this.http.get<ProductsResponse>(
      `${environment.baseUrl}/products?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
      )
  }

  getProductImageUrl(productId: string) {
    return `${environment.baseUrl}/products/image/${productId}`;
  }

  deleteProduct(productId: string){
    return this.http.delete(`${environment.baseUrl}/products/${productId}`);
  }

  updateProduct(product: Product){
    return this.http.put<Product>(`${environment.baseUrl}/products/${product.productId}`, 
    product
    );
  }

  updateCategoryOfProduct(productId: string, categoryId: string){
    return this.http.put<Product>(`${environment.baseUrl}/categories/${categoryId}/products/${productId}`, 
    null
    );
  }

  searchProduct(
    query: string,
    pageNumber=0, 
    pageSize=10, 
    sortBy='title', 
    sortDir='asc'){
    return this.http.get<ProductsResponse>(
      `${environment.baseUrl}/products/search/${query}?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
      );
  }
}
