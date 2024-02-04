import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginResponse } from './models/loginResponse.model';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { Cart } from './models/cart.model';
import { User } from './models/user.model';
import { updateCart } from './store/cart/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user?: User;

  constructor(private store: Store<{auth: loginResponse}>,
              private authService: AuthService,
              private cartService: CartService,
              private cartStore: Store<{cart: Cart}>
              ) {
    this.store.select('auth').subscribe({
      next: loginData => {
        this.authService.saveLoginDataToLocalStorage(loginData);
        this.user = loginData.user;
      }
    });
    if(this.user){
      this.cartService.getCartOfUser(this.user.userId).subscribe({
        next: cart => {
          this.cartStore.dispatch(updateCart({cart: cart}));
        }
      })
    }
  }

  title = 'angular-e-commerce';
}
