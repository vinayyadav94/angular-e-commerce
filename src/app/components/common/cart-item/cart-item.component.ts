import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Cart, CartItem } from '../../../models/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @Input() cartItem?: CartItem;
  @Output() itemIncreasequantityEvent = new EventEmitter<CartItem>();
  @Output() itemDecreasequantityEvent = new EventEmitter<CartItem>();
  @Output() deleteItemEvent = new EventEmitter<CartItem>();

  constructor(public productService: ProductService){}

  increaseQuantity(cartItem: CartItem){
    this.itemIncreasequantityEvent.next(cartItem);
  }

  decreaseQuantity(cartItem: CartItem){
    this.itemDecreasequantityEvent.next(cartItem);
  }

  deleteItemFromCart(cartItem: CartItem){
    this.deleteItemEvent.next(cartItem);
  }

}
