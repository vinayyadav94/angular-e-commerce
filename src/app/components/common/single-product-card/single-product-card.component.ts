import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-single-product-card',
  templateUrl: './single-product-card.component.html',
  styleUrls: ['./single-product-card.component.css']
})
export class SingleProductCardComponent {
  
  @Input() product?: Product;

  constructor(public productService: ProductService) {}
}
