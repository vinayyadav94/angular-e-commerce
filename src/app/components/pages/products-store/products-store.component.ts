import { Component, OnInit } from '@angular/core';
import { Product, ProductsResponse } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products-store',
  templateUrl: './products-store.component.html',
  styleUrls: ['./products-store.component.css']
})
export class ProductsStoreComponent implements OnInit {
  
  productsResponse?: ProductsResponse;
  loading = false;
  pageNumber = 0;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts(0);
  }

  getAllProducts(
    pageNumber=0,
    pageSize=9,
    sortBy='title',
    sortDir='asc'
  ){
    this.productService.getAllProducts(pageNumber,pageSize,sortBy,sortDir).subscribe({
      next: (response)=>{
        if(response.pageNumber == 0){
          this.productsResponse = response;
        }else{
          this.productsResponse = {
            ...response,
            content: [...this.productsResponse?.content as Product[], ...response.content]
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
      this.getAllProducts(this.pageNumber);
    }
  }
}
