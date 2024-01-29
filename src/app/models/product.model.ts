import { Category } from "./category.model";

export class Product {
    constructor(
        public productId: string = '',
        public title: string = '',
        public description: string = '',
        public quantity: number = 0,
        public price: number = 0,
        public discountedPrice: number = 0  ,
        public live: boolean = false,
        public stock: boolean = false,
        public category: Category = new Category('','','','')
    ) {}
}

export interface ProductsResponse {
    lastPage: boolean;
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
    content: Product[];
}