import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { LoginComponent } from './core/auth/login/login.component';
import { RegisterComponent } from './core/auth/register/register.component';
import { CartComponent } from './features/cart/cart.component';
import { BrandsComponent } from './features/brands/brands.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { DetailsComponent } from './features/details/details.component';
import { authGuard } from './core/guards/auth-guard';
import { isloginGuard } from './core/guards/islogin-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [isloginGuard],
    children: [
      { path: 'login', component: LoginComponent, title: 'login ' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./core/auth/forgrtpassword/forgrtpassword.component').then(
            (c) => c.ForgrtpasswordComponent
          ),
        title: 'forgetPassword',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./features/home/home.component').then((c) => c.HomeComponent),
        title: 'home',
      },
      { path: 'cart', component: CartComponent, title: 'cart' },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorder/allorder.component').then(
            (c) => c.AllorderComponent
          ),
        title: 'allorders',
      },
      {
        path: 'details/:slug /:id',
        component: DetailsComponent,
        title: 'details',
      },

      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./features/checkout/checkout.component').then(
            (c) => c.CheckoutComponent
          ),
        title: 'checkout',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products.component').then(
            (c) => c.ProductsComponent
          ),
        title: 'products',
      },
    ],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/notfound/notfound.component').then(
        (c) => c.NotfoundComponent
      ),
    title: 'not-found-page',
  },
];
