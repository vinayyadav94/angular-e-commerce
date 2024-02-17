import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Order } from 'src/app/models/order.model';
import { OrderStatus, paymentStatus } from 'src/app/models/orderRequest.model';
import { AuthService } from 'src/app/services/auth.service';
import { HelperService } from 'src/app/services/helper.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order-view-modal',
  templateUrl: './order-view-modal.component.html',
  styleUrls: ['./order-view-modal.component.css']
})
export class OrderViewModalComponent implements OnInit, OnDestroy {

  order?: Order;
  @ViewChild('content') content?: ElementRef;
  public orderStatus =  OrderStatus;
  public paymentStatus =  paymentStatus;
  public modalSubscription?: Subscription;
  isUpdate = false;
  isAdmin = false;

  constructor(
    private modalService: NgbModal,
    private helper: HelperService,
    public productService: ProductService,
    private auth: AuthService,
    private paymentService: PaymentService,
    private router: Router,
    private toastr: ToastrService
    ){}
  ngOnInit(): void {
    this.modalSubscription = this.helper.openOrderModalEmitter.subscribe({
      next: (order: Order)=>{
        this.order = order;
        console.log(order);
        this.open(this.content);
      }
    })
    this.isAdminUser();
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

  updateOrder(event: Event){
    event.preventDefault();
    this.isUpdate = !this.isUpdate;
  }

  compareFn(value: any, option: any){
    console.log('value',value.value,'option',option)
    return value?.value === option;
  }

  isAdminUser(){
    this.auth.getLoggedInData().subscribe({
      next: data=>{
          data.user?.roles.forEach(role=>{
            if(role.roleName === 'ROLE_ADMIN'){
              this.isAdmin = true;
            }
          })
      }
    })
  }

  payForOrder(order: Order | undefined){
    //initiate payment
    if(order){
      this.paymentService.initiatePayment(order.orderId).subscribe({
        next: (data: any) => {
          console.log(data);
          const subscription = this.paymentService.payWithRazorPay({
            amount: data.amount, 
            razorpayOrderId: data.razorpayOrderId,
            username: order.billingName,
            email: order.user.email,
            contact: order.billingPhone
        })
        .subscribe({
          next: data=>{
            console.log(data);
            subscription.unsubscribe();
            
            //server api call for payment capture
            this.paymentService.captureAndVerifyPayment(order.orderId, data).subscribe({
              next: (data: any) => {
                console.log(data);
                this.toastr.success(data.message);
                this.modalService.dismissAll();
                this.router.navigate(['/my-orders']);
              },
              error: err=>{
                console.log(err);
                this.toastr.error('Error in capturing payment!')
              }
            })
          },
          error: err=>{
            console.log(err);
            this.toastr.error('Payment failed, you can retry making payment!')
            subscription.unsubscribe();
          }
        })
        }
      })
    }
  }

}
