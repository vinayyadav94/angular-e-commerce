import { Component, OnInit } from '@angular/core';
import { Order, OrderResponse } from 'src/app/models/order.model';
import { HelperService } from 'src/app/services/helper.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.css']
})
export class ViewOrdersComponent implements OnInit {

    orderResponse?: OrderResponse;

    constructor(
      private orderService: OrderService,
      private helper: HelperService){}

    ngOnInit(): void {
      this.orderService.getAllOrder().subscribe({
        next: data=>{
          this.orderResponse = data;
          console.log(this.orderResponse);
        }
      })
    }

}
