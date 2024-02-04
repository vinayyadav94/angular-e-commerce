import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrls: ['./single-product-card.component.css']
})
export class SingleProductCardComponent implements OnInit {
  
  @Input() product?: Product;
  user?: User;

  constructor(
    public productService: ProductService,
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService
    ) {}

  ngOnInit(): void {
    this.authService.getLoggedInData().subscribe({
      next: data=>{
        this.user = data.user;
      }
    })
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
