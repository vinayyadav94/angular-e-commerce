import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-stores-product-detail',
  templateUrl: './stores-product-detail.component.html',
  styleUrls: ['./stores-product-detail.component.css']
})
export class StoresProductDetailComponent implements OnInit {
  
  productId?: string;
  product?: Product;
  user?: User;

  constructor(
    private activatedRoute: ActivatedRoute,
    public productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private title: Title,
    private toastr: ToastrService){
    this.activatedRoute.params.subscribe(params=>{
      this.productId = params['productId'];
      console.log(this.productId);
    })
  }

  ngOnInit(): void {
    this.loadProductDetails();
    this.authService.getLoggedInData().subscribe({
      next: data=>{
        this.user = data.user;
      }
    })
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

  addToCart(product: Product){
    if(this.user){
      this.cartService.addItemToCart(this.user.userId, {
        productId: product.productId,
        quantity: 1
      }).subscribe({
        next: data=>{
          console.log(data);
          this.toastr.success(product.title+' is successfully added to the cart.');
        },
        error: err=>{
          console.log(err);
        }
      })
    }else{
      this.toastr.warning('Please login to add item to the cart!');
    }
  }
}
