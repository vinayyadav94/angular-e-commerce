import { Component, OnInit } from '@angular/core';
import { OrderResponse } from 'src/app/models/order.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  user?: User;
  orderResponse: OrderResponse = {
    content: [],
    lastPage: true,
    pageNumber: 0,
    pageSize: 99999,
    totalElements: 99999,
    totalPages: 1
  }

  constructor(
    private auth: AuthService,
    private orderService: OrderService
    ) {
    this.auth.getLoggedInData().subscribe({
      next: data=>{
        this.user = data.user;
      }
    })
  }

  ngOnInit(): void {
    if(this.user){
      this.orderService.getOrderOfUser(this.user.userId).subscribe({
        next: orderResponse=>{
          this.orderResponse.content = orderResponse.sort((a, b)=>{
            return Number(b.orderedDate) - Number(a.orderedDate);
          });
        }
      })
    }
  }

}
