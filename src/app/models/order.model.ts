import { Product } from "./product.model";
import { User } from "./user.model";

export interface Order{
    billingAddress: string,
    billingName: string,
    billingPhone: string,
    deliveredDate: Date,
    orderAmount: number,
    orderId: string,
    orderItems: OrderItem[],
    orderStatus: string,
    orderedDate: Date,
    paymentStatus: string,
    user: User
}

export interface OrderItem{
    orderItemId: number,
    product: Product,
    quantity: number,
    totalPrice: number
}

export interface OrderResponse{
    content: Order[],
    lastPage: boolean,
    pageNumber: number,
    pageSize: number,
    totalElements: number,
    totalPages: number
}