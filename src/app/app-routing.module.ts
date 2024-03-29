import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';
import { normalUserGuard } from './guards/normal-user.guard';
import { DashboardComponent as AdminDashboard } from './components/admin/dashboard/dashboard.component';
import { adminUserGuard } from './guards/admin-user.guard';
import { HomeComponent as AdminHomeComponent } from './components/admin/home/home.component';
import { AddProductComponent } from './components/admin/add-product/add-product.component';
import { ViewProductComponent } from './components/admin/view-product/view-product.component';
import { AddCategoriesComponent } from './components/admin/add-categories/add-categories.component';
import { ViewCategoriesComponent } from './components/admin/view-categories/view-categories.component';
import { ViewOrdersComponent } from './components/admin/view-orders/view-orders.component';
import { ViewUsersComponent } from './components/admin/view-users/view-users.component';
import { UserComponent } from './components/pages/user/user.component';
import { ProductsStoreComponent } from './components/pages/products-store/products-store.component';
import { CategoriesStoreComponent } from './components/pages/categories-store/categories-store.component';
import { StoresProductDetailComponent } from './components/pages/stores-product-detail/stores-product-detail.component';
import { CartComponent } from './components/pages/cart/cart.component';
import { MyOrdersComponent } from './components/pages/my-orders/my-orders.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
    title: 'eStore: Home'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'eStore: Login'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'eStore: Sign Up'
  },
  {
    path: 'products',
    component: ProductsStoreComponent,
    title: 'eStore: All Products'
  },
  {
    path: 'product/:productId',
    component: StoresProductDetailComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    title: 'eStore: Cart'
  },
  {
    path: 'products/:categoryId/:categoryTitle',
    component: CategoriesStoreComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'eStore: About'
  },
  {
    path: 'feature',
    component: FeatureComponent,
    title: 'eStore: Features'
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'eStore: Categories'
  },
  {
    path: 'user',
    component: DashboardComponent,
    title: 'eStore: Dashboard',
    canActivate: [normalUserGuard]
  },
  {
    path: 'profile',
    component: UserComponent,
    canActivate: [normalUserGuard]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    title: 'eStore: My Orders'
  },
  {
    path: 'admin',
    component: AdminDashboard,
    title: 'eStore: Admin Dashboard',
    canActivate: [adminUserGuard],
    children: [
      {
        path: 'home',
        component: AdminHomeComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'view-products',
        component: ViewProductComponent
      },
      {
        path: 'add-category',
        component: AddCategoriesComponent
      },
      {
        path: 'view-categories',
        component: ViewCategoriesComponent
      },
      {
        path: 'add-product',
        component: AddProductComponent
      },
      {
        path: 'orders',
        component: ViewOrdersComponent
      },
      {
        path: 'users',
        component: ViewUsersComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
