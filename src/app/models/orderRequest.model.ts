export interface OrderRequest{
    billingAddress: string,
    billingName: string,
    billingPhone: string,
    cartId: string,
    orderStatus: OrderStatus,
    paymentStatus: paymentStatus,
    userId: string
  }

export enum OrderStatus{
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    DISPATCHED = 'DISPATCHED', 
    DELIVERED = 'DELIVERED'
}

export enum paymentStatus{
    PENDING = 'PENDING',
    PAID = 'PAID'
}