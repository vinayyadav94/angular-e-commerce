import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { CategoryComponent } from './components/pages/category/category.component';
import { DashboardComponent } from './components/user/dashboard/dashboard.component';

const routes: Routes = [
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
    path: 'home',
    component: HomeComponent,
    title: 'eStore: Home'
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
    title: 'eStore: Dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
