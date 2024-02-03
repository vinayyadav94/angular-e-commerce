import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Cart } from '../models/Cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  getCartOfUser(userId: string){
    return this.http.get<Cart>(`${environment.baseUrl}/carts/${userId}`);
  }

  addItemToCart(userId: string, data: {productId: string, quantity: number}){
    return this.http.post<Cart>(
      `${environment.baseUrl}/carts/${userId}`, data
      );
  }

  clearCart(userId: string){
    return this.http.delete<Cart>(`${environment.baseUrl}/carts/${userId}`);
  }

  removeItemFromCart(userId: string, itemId: number){
    return this.http.delete<Cart>(
      `${environment.baseUrl}/carts/${userId}/items/${itemId}`
      );
  }
}
