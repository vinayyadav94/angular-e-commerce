import { Component, Input } from '@angular/core';
import { Order, OrderResponse } from 'src/app/models/order.model';
import { HelperService } from 'src/app/services/helper.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-hub',
  templateUrl: './order-hub.component.html',
  styleUrls: ['./order-hub.component.css']
})
export class OrderHubComponent {

  @Input() orderResponse?: OrderResponse;

    constructor(
      private orderService: OrderService,
      private helper: HelperService){}

    ngOnInit(): void {
      // this.orderService.getAllOrder().subscribe({
      //   next: data=>{
      //     this.orderResponse = data;
      //     console.log(this.orderResponse);
      //   }
      // })
    }

    //open view order modal
    openModal(order: Order){
      this.helper.emitOrderEvent(order);
    }
}
