import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './views/homepage/homepage.component';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { SignupPageComponent } from './views/signup-page/signup-page.component';
import { SingleProductPageComponent } from './views/single-product-page/single-product-page.component';
import { ShoppingCartPageComponent } from './views/shopping-cart-page/shopping-cart-page.component';
import { CheckoutPageComponent } from './views/checkout-page/checkout-page.component';
import { AdminPageComponent } from './views/admin-page/admin-page.component';
import { AdminGuard } from './guards/admin.guard';
import { CheckoutGuard } from './guards/checkout.guard';
import { OrderPageComponent } from './views/order-page/order-page.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'app-root', component: AppComponent },
  { path: 'app-homepage', component: HomepageComponent },
  { path: 'app-login-page', component: LoginPageComponent },
  { path: 'app-signup-page', component: SignupPageComponent },
  {
    path: 'app-single-product-page/:productId',
    component: SingleProductPageComponent,
  },
  { path: 'app-shopping-cart-page', component: ShoppingCartPageComponent },
  { path: 'app-checkout-page', component: CheckoutPageComponent, canActivate: [CheckoutGuard] },
  { path: 'app-admin-page', component: AdminPageComponent, canActivate: [AdminGuard] },
  { path: 'app-order-page', component: OrderPageComponent},
  //{ path: '', redirectTo: 'app-homepage', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
