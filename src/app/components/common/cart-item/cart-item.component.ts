import { Component, Input } from '@angular/core';
import { Cart, CartItem } from '../../../models/cart.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {

  @Input() cartItem?: CartItem;

  constructor(public productService: ProductService){}

}
