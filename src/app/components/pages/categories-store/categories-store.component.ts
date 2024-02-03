import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-categories-store',
  templateUrl: './categories-store.component.html',
  styleUrls: ['./categories-store.component.css']
})
export class CategoriesStoreComponent {

  categoryId?: string;
  categoryTitle?: string;
  productsResponse?: ProductsResponse;
  loading = false;
  pageNumber = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private title: Title) {
    this.activatedRoute.paramMap.subscribe((params)=>{
      this.categoryId = params.get('categoryId') as string;
      this.categoryTitle = params.get('categoryTitle') as string;
      this.title.setTitle(this.categoryTitle as string);
      this.loadCategoryProduct(this.categoryId!);
    })
  }

  loadCategoryProduct(
    categoryId: string,
    pageNumber=0,
    pageSize=9,
    sortBy='title',
    sortDir='asc'
  ) {
    this.productService.getProductsOfCategory(
      this.categoryId!, pageNumber, pageSize, sortBy, sortDir
      ).subscribe({
      next: products=>{
        if(pageNumber == 0){
          this.productsResponse = products;
          console.log(products);
        }else{
          this.productsResponse = {
            ...products,
            content: [...this.productsResponse?.content as Product[], ...products.content]
          }
        }
      }
    })
  }

  productsScrolled(){
    console.log('scrolled...')
    if(this.loading || this.productsResponse?.lastPage){
      return;
    }else{
      this.pageNumber += 1;
      this.loadCategoryProduct(this.categoryId as string, this.pageNumber);
    }
  }
}
