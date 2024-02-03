import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-stores-product-detail',
  templateUrl: './stores-product-detail.component.html',
  styleUrls: ['./stores-product-detail.component.css']
})
export class StoresProductDetailComponent implements OnInit {
  
  productId?: string;
  product?: Product;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private title: Title){
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['productId'];
      console.log(this.productId);
    })
  }

  ngOnInit(): void {
    this.loadProductDetails();
  }

  loadProductDetails(){
    if(this.productId){
      this.productService.getProductDetail(this.productId).subscribe({
        next: data=>{
          console.log(data);
          this.product = data;
          this.title.setTitle('eStore: '+this.product?.title)
        }
      })
    }
  }
}
