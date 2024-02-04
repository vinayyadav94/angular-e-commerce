import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../../../models/cart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import { updateCart } from 'src/app/store/cart/cart.actions';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart?: Cart;
  user?: User;

  constructor(
    public cartService: CartService,
    private authService: AuthService,
    private router: Router,
    private cartStore: Store<{cart: Cart}>
    ) {}

  ngOnInit(): void {
    this.authService.getLoggedInData().subscribe({
      next: userData=>{
        if(userData.login){
          this.user = userData.user;
          this.loadCart();
        }else{
          this.router.navigate(['/login']);
        }
      }
    })
  }

  loadCart(){
    if(this.user){
      this.cartService.getCartOfUser(this.user?.userId).subscribe({
        next: cart=>{
          this.cart = cart;
          this.cartStore.dispatch(updateCart({cart: this.cart}));
        },
        error: err=>{
          console.log(err); 
        }
      })
    }
  }

}
