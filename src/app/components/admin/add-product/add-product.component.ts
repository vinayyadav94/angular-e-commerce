import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { setCategoryData } from 'src/app/store/category/category.actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: Category[] = [];

  product = new Product();

  imageData:ImageData = {
    previewImageUrl: '',
    file: undefined
  }

  constructor(
    private catService: CategoryService,
    private catStore: Store<{cat: Category[]}>,
    private toastr: ToastrService,
    private productService: ProductService) {}

  

  ngOnInit(): void {
    //loading categories
    this.catStore.select("cat").subscribe({
      next: categories => {
        if(categories.length > 0){
          console.log('categories is already there');
          this.categories = categories;
        }else{
          console.log('no categories.. load from server')
          this.catService.getCategories().subscribe({
            next: (categories) => {
              this.categories = categories.content;
              //add this data to store
              this.catStore.dispatch(setCategoryData({categories: this.categories}))
            }
          })
        }
      }
    })
  }

  onSubmit(event: SubmitEvent) {
    event.preventDefault();
    // also validate if any...
    if(this.product.title.trim() === ''){
      this.toastr.error('title is required!');
      return;
    }
    if(this.product.description.trim() === ''){
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

    if(this.product.category.categoryId === ''){
      //add product without category
      this.productService.createProduct(this.product).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('product created. The product id is' + data.productId);
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('some error occured while creating product');
        }
      })
    }else{
      //add product with category
      this.productService.createProductWithCategory(this.product).subscribe({
        next: (data) => {
          console.log(data);
          this.toastr.success('product created. The product id is' + data.productId);
          this.product = new Product();

          //image upload
          this.productService.uploadProductImage(data.productId, this.imageData.file!).subscribe({
            next: (res) => {
              console.log(res);
              this.toastr.success('product image also uploaded !!');
              this.imageData = {
                previewImageUrl: '',
                file: undefined
              }
            },
            error: (err) => {
              console.log(err);
              this.toastr.error('Some error occured while uploading image !!')
            }
          })
        },
        error: (err) => {
          console.log(err);
          this.toastr.error('some error occured while creating product');
        }
      })
    }
  }

  onReset() {
    this.product = {
      productId: '',
      title: '',
      description: '',
      quantity: 0,
      price: 0,
      discountedPrice: 0,
      live: false,
      stock: false,
      category: new Category('','','','')
      //productImageFile: null
    };
  }

  onFileChange(event: Event) {
    // Handle file change event and assign the selected file to the property
    console.log(event);
    this.imageData.file = (event.target as HTMLInputElement).files![0]
    console.log(this.imageData.file);
    if(
      this.imageData.file.type == 'image/jpg' ||
      this.imageData.file.type == 'image/jpeg'
      ){
        //preview file
        const reader = new FileReader();
        reader.onload = () => {
          this.imageData.previewImageUrl = reader.result as string;
        };
        reader.readAsDataURL(this.imageData.file);
        //upload file
      }else{
        this.toastr.error('Only jpg or jpeg are allowed!');
        this.imageData.file = undefined;
      }
  }

  //custom logic to compare dropdown
  categoriesCompare(value:any, option:any) {
    return value?.categoryId === option?.categoryId
  }

}

export interface ImageData {previewImageUrl:string, file:File | undefined}
