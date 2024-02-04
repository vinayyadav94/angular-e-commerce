import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/pages/home/home.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CustomNavbarComponent } from './components/common/custom-navbar/custom-navbar.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './store/auth/auth.reducer';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { ViewProductComponent } from './components/admin/view-product/view-product.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewOrdersComponent } from './components/admin/view-orders/view-orders.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
//third party library for using icons
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconHome, IconCategoryPlus, IconCategoryFilled, IconShoppingCartOff, IconShoppingCart, IconTruckDelivery, IconUsers, IconLogout, IconPlus, IconMinus, IconTrash } from 'angular-tabler-icons/icons';
import { JwtInterceptor } from './services/jwtInterceptor';
import { SingleCategoryViewComponent } from './components/pages/single-category-view/single-category-view.component';
import { categoryReducer } from './store/category/category.reducers';
import { QuillModule } from 'ngx-quill';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './components/pages/user/user.component';
import { UserViewComponent } from './components/common/user-view/user-view.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductsStoreComponent } from './components/pages/products-store/products-store.component';
import { SingleProductCardComponent } from './components/common/single-product-card/single-product-card.component';
import { ProductCategoriesViewComponent } from './components/common/product-categories-view/product-categories-view.component';
import { CategoriesStoreComponent } from './components/pages/categories-store/categories-store.component';
import { StoresProductDetailComponent } from './components/pages/stores-product-detail/stores-product-detail.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { CartItemComponent } from './components/common/cart-item/cart-item.component';

const icons = {
  IconHome,
  IconCategoryPlus,
  IconCategoryFilled,
  IconShoppingCartOff,
  IconShoppingCart,
  IconTruckDelivery,
  IconUsers,
  IconLogout,
  IconPlus,
  IconMinus,
  IconTrash
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    CustomNavbarComponent,
    AboutComponent,
    FeatureComponent,
    CategoryComponent,
    DashboardComponent,
    AddProductComponent,
    ViewProductComponent,
    AddCategoriesComponent,
    ViewCategoriesComponent,
    ViewOrdersComponent,
    ViewUsersComponent,
    AdminDashboardComponent,
    SingleCategoryViewComponent,
    UserComponent,
    UserViewComponent,
    ProductsStoreComponent,
    SingleProductCardComponent,
    ProductCategoriesViewComponent,
    CategoriesStoreComponent,
    StoresProductDetailComponent,
    CartComponent,
    CartItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added,
    HttpClientModule, 
    StoreModule.forRoot({
      auth: authReducer,
      cat: categoryReducer
    }),
    TablerIconsModule.pick(icons),
    QuillModule.forRoot(),
    SweetAlert2Module.forRoot({}),
    InfiniteScrollModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
