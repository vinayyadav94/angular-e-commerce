import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginResponse } from 'src/app/models/loginResponse.model';
import { removeLoginData } from 'src/app/store/auth/auth.action';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(
    private router: Router,
    private store: Store<{auth: loginResponse}>){}

  adminMenus = [
    {
      title: 'Home',
      link: '/admin/view-products',
      icon: 'home'
    },
    {
      title: 'Add Category',
      link: '/admin/add-category',
      icon: 'category-plus'
    },
    {
      title: 'View Categories',
      link: '/admin/view-categories',
      icon: 'category-filled'
    },
    {
      title: 'Add Product',
      link: '/admin/add-product',
      icon: 'shopping-cart-off'
    },
    {
      title: 'View Products',
      link: '/admin/view-products',
      icon: 'shopping-cart'
    },
    {
      title: 'View Orders',
      link: '/admin/orders',
      icon: 'truck-delivery'
    },
    {
      title: 'View Users',
      link: '/admin/users',
      icon: 'users'
    }
  ]

  logout() {
    this.store.dispatch(removeLoginData());
    this.router.navigate(['/login']);
  }

}
