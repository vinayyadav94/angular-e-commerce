import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItem } from '../../../models/cart.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { Store } from '@ngrx/store';
import { updateCart } from 'src/app/store/cart/cart.actions';
import { ToastrService } from 'ngx-toastr';

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
    private cartStore: Store<{cart: Cart}>,
    private toastr: ToastrService
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

  increaseCartItemQuantity(cartItem: CartItem){
    this.updateCartItemQuantity(cartItem, cartItem.quantity+1);
  }

  decreaseCartItemQuantity(cartItem: CartItem){
    this.updateCartItemQuantity(cartItem, cartItem.quantity-1);
  }

  deleteItemFromCart(cartItem: CartItem){
    this.cartService.removeItemFromCart(this.user?.userId as string, cartItem.cartItemId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.toastr.success(data.message);
        if(this.cart){
          this.cart = {
            ...this.cart,
            items: this.cart?.items.filter(
              item => {
                return item.cartItemId !== cartItem.cartItemId
              }
              )
          };
          this.cartStore.dispatch(updateCart({cart: this.cart}));
        }
      },
      error: err => {
        console.log(err);
      }
    })
  }

  updateCartItemQuantity(cartItem: CartItem, quantity: number){
    this.cartService.addItemToCart(this.user?.userId as string, {
      productId: cartItem.product.productId,
      quantity: quantity
    }).subscribe({
      next: cart => {
        console.log(cart);
        this.cart = cart;
        this.cartStore.dispatch(updateCart({cart: cart}));
        this.toastr.success(`${quantity} ${cartItem.product.title} is successfully added in the cart`);
      }
    })
  }

  clearCart(){
    this.cartService.clearCart(this.user?.userId as string).subscribe({
      next: (data: any)=>{
        console.log(data);
        if(data.success){
          this.toastr.success('Your cart is empty now!');
          if(this.cart){
            this.cart = { ...this.cart, items: []};
            this.cartStore.dispatch(updateCart({cart: this.cart}));
          }
        }
      },
      error: err=>{
        console.log(err);
      }
    })
  }

}
