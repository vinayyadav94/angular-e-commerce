import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderRequest } from '../models/orderRequest.model';
import { OrderResponse } from '../models/order.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  createOrder(orderRequest: OrderRequest){
    return this.http.post(`${environment.baseUrl}/orders`, orderRequest);
  }

  getAllOrder(
    pageNumber=0, 
    pageSize=10, 
    sortBy='orderedDate', 
    sortDir='desc'
  ){
    return this.http.get<OrderResponse>(
      `${environment.baseUrl}/orders?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
      );
  }

  getOrderOfUser(userId: string){
    return this.http.get(`${environment.baseUrl}/orders/users/${userId}`);
  }
}
