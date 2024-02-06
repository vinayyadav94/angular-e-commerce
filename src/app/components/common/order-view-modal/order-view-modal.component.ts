import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { HelperService } from 'src/app/services/helper.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css']
})
export class OrderViewModalComponent implements OnInit, OnDestroy {

  order?: Order;
  @ViewChild('content') content?: ElementRef;
  public modalSubscription?: Subscription;

  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    public productService: ProductService){}
  ngOnInit(): void {
    this.modalSubscription = this.helper.openOrderModalEmitter.subscribe({
      next: (order: Order)=>{
        this.order = order;
        console.log(order)
        this.open(this.content)
      }
    })
  }
  ngOnDestroy(): void {
    this.modalSubscription?.unsubscribe();
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
