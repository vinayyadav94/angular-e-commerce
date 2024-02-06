import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Order } from 'src/app/models/order.model';
import { HelperService } from 'src/app/services/helper.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css']
})
export class OrderViewModalComponent {

  order?: Order;
  @ViewChild('content') content?: ElementRef;

  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    public productService: ProductService){
      this.helper.openOrderModalEmitter.subscribe({
        next: (order: Order)=>{
          this.order = order;
          console.log(order)
          this.open(this.content)
        }
      })
    }

  closeResult = '';

	open(content: any) {
		this.modalService.open(content, 
      { 
        ariaLabelledBy: 'modal-basic-title',
        size: 'lg'
       }
      )
	}

}
