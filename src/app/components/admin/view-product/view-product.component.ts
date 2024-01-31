import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Product, ProductsResponse } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { setCategoryData } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  productsResponse?: ProductsResponse;
  previousProductsResponse?: ProductsResponse;
  product?: Product;
  update = false;
  categories: Category[] = [];
  searchQuery = '';
  searchMode = false;

  constructor(
    public productService: ProductService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private categoryService: CategoryService,
    private catStore: Store<{cat: Category[]}>
  ) {}

  ngOnInit(): void {
    this.loadProducts(0);
  }

  loadProducts(pageNumber=0){
    this.productService.getAllProducts(pageNumber, 10, 'addedDate', 'desc').subscribe({
      next: productsRes=>{
        this.productsResponse = productsRes;
        console.log(productsRes)
      }
    })
  }

  pageChange(page: number){
    if(this.searchMode){
      this.productSearchService(page-1)
    }else{
      this.loadProducts(page-1);
    }
  }

  open(content: any, product: Product) {
		this.modalService.open(content, { 
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg' 
    })
    
    this.product = product;
    this.update = false;
	}

  yesDeleteProduct(event:any, product: Product){
    if(event){
      //delete the product
      this.productService.deleteProduct(product.productId).subscribe({
        next: (result: any)=>{
          console.log(result);
          this.toastr.success(result.message);

          //filter the product array to show the updated view
          if(this.productsResponse) {
            this.productsResponse.content = this.productsResponse.content.filter(p => p.productId !== product.productId);
          }
        },
        error: err=>{
          console.log(err);
          this.toastr.error('some error occured while deleting the product!');
        }
      })
    }
  }

  loadCategories(){
    //loading categories from store if availavle and if not then from backend
    this.categoryService.getCategoriesFromStore().subscribe({
      next: categories=>{
        if(categories.length > 0) {
          this.categories = categories;
        }else{
          //load data from server
          this.categoryService.getCategories().subscribe({
            next:categoryResponse=>{
              //push categories to store
              this.catStore.dispatch(
                setCategoryData({categories: categoryResponse.content})
                )
            }
          })
        }
      }
    })
  }

  toggleUpdateView(content: any, product: Product){
    this.update = true;
    this.product = product
    this.modalService.open(content, { 
      ariaLabelledBy: 'modal-basic-title',
      size: 'lg' 
    })
    .result.then()
    .catch()
    .finally(()=>{
      this.update = false;
    });
    this.loadCategories();
  }

  //custom logic to compare dropdown
  categoriesCompare(value:any, option:any) {
    return value?.categoryId === option?.categoryId
  }

  toggleUpdateViewBottom(){
    this.update = !this.update;
    this.loadCategories();
  }

  updateSubmit(event:Event){
    event.preventDefault();
    //validate data
    if(this.product != null){
      if(this.product.title.trim() === ''){
        this.toastr.error('title is required!');
        return;
      }
      if(this.product.description == null || this.product.description.trim() === ''){
        this.toastr.error('description is required!');
        return;
      }
      if(this.product.quantity <= 0){
        this.toastr.error('quantity must be greater than 0!');
        return;
      }
      if(this.product.price <= 0){
        this.toastr.error('price must be greater than 0!');
        return;
      }
      if(this.product.discountedPrice <= 0 || +this.product.discountedPrice > +this.product.price){
        this.toastr.error('discounted price must be greater than 0 and less than or equal to MRP');
        return;
      }
      console.log('submit form to update')
      this.productService.updateProduct(this.product).subscribe({
        next: data=>{
          this.toastr.success(this.product?.title+' has been successfullly updated!');
          this.product = data;
        },
        error: err=>{
          this.toastr.error('some error occurred while updating product!');
          console.log(err);
        }
      })
    }
  }

  updateProductCategory(event: Event){
    event.preventDefault();
    if(this.product){
      this.productService.updateCategoryOfProduct(
        this.product.productId, 
        this.product.category.categoryId)
      .subscribe({
        next: data=>{
          this.product = data;
          this.toastr.success('Product category has been updated!');
        },
        error: err=>{
          this.toastr.error('Error in updating product category!');
        }
      })
    }
  }

  searchProduct(event: Event){
    event.preventDefault();
    if(this.searchQuery.trim() === ''){
      this.toastr.error('search query required');
      if(this.previousProductsResponse){
        this.productsResponse = this.previousProductsResponse;
        this.searchMode = false;
      }
      return;
    }
    this.productSearchService(0);
  }
  productSearchService(
    pageNumber: number = 0,
    pageSize: number = 10,
    sortBy: string = 'title',
    sortDir: string = 'asc'
  ){
    this.productService
      .searchProduct(this.searchQuery, pageNumber, pageSize, sortBy, sortDir)
        .subscribe({
          next: data=>{
            if(this.searchMode){
              this.productsResponse = data;
            }else{
              this.previousProductsResponse = this.productsResponse;
              this.productsResponse = data;
              this.searchMode = true;
            }
          }
        })
  }
  restoreOldData(){
    if(this.searchQuery.trim() == '' && this.previousProductsResponse){
      this.productsResponse = this.previousProductsResponse;
      this.previousProductsResponse = undefined;
      this.searchMode = false;
    }
  }

}
