import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/pages/login/login.component';
import { SignupComponent } from './components/pages/signup/signup.component';
import { HomeComponent } from './components/pages/home/home.component';
import { AboutComponent } from './components/pages/about/about.component';
import { FeatureComponent } from './components/pages/feature/feature.component';
import { CategoryComponent } from './components/pages/category/category.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    title: 'Electronic Store: Login'
  },
  {
    path: 'signup',
    component: SignupComponent,
    title: 'Electronic Store: Sign Up'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Electronic Store: Home'
  },
  {
    path: 'about',
    component: AboutComponent,
    title: 'Electronic Store: About'
  },
  {
    path: 'feature',
    component: FeatureComponent,
    title: 'Electronic Store: Features'
  },
  {
    path: 'category',
    component: CategoryComponent,
    title: 'Electronic Store: Categories'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
