import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  adminMenus = [
    {
      title: 'Home',
      link: '/admin/home',
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

}
