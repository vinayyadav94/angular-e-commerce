import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

declare var Razorpay: any;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  initiatePayment(orderId: string){
    return this.http.post(`${environment.baseUrl}/payments/initiate-payment/${orderId}`,
    {}
    );
  }

  captureAndVerifyPayment(orderId: string, paymentData: any){
    return this.http.post(
      `${environment.baseUrl}/payments/captureAndVerifyPayment/${orderId}`, 
      paymentData
    );
  }

  //payment with razorpay
  payWithRazorPay(paymentOption: 
    {
    amount: number, 
    razorpayOrderId: string,
    username: string,
    email: string,
    contact: string
  }
  ){
    const subject = new Subject<any>();
    const option = {
      key: environment.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: paymentOption.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'VINI Technologies', //your business name
      description: 'You will receive you invoice in your registered email',
      image: 'https://media.licdn.com/dms/image/D4D0BAQF7sfomxWdB7Q/company-logo_200_200/0/1682008826822?e=2147483647&v=beta&t=tk9qhjC14DstYoqOMH7iANonw0vi9bKCQDSlXDl269I',
      order_id: paymentOption.razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      //callback_url: 'https://eneqd3r9zrjok.x.pipedream.net/',
      "handler": function (response: any){
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        subject.next({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpayPaymentSignature: response.razorpay_signature 
        })
    },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: paymentOption.username, //your customer's name
        email: paymentOption.email,
        contact: paymentOption.contact, //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: 'VINI Technologies, Pune',
      },
      theme: {
        color: '#3399cc',
      },
    };

    const pay = new Razorpay(option);

    pay.on('payment.failed', function (response: any){
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
      subject.error(response.error);
  });

    pay.open();

    return subject;

  }
}
