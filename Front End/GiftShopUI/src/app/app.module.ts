import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomepageComponent } from './views/homepage/homepage.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { SignupPageComponent } from './views/signup-page/signup-page.component';
import { SingleProductPageComponent } from './views/single-product-page/single-product-page.component';
import { ShoppingCartPageComponent } from './views/shopping-cart-page/shopping-cart-page.component';
import { CheckoutPageComponent } from './views/checkout-page/checkout-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { AdminPageComponent } from './views/admin-page/admin-page.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderPageComponent } from './views/order-page/order-page.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function tokenGetter() {
  return localStorage.getItem('access_token'); // Adjust the storage method
}

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NavbarComponent,
    FooterComponent,
    LoginPageComponent,
    SignupPageComponent,
    SingleProductPageComponent,
    ShoppingCartPageComponent,
    CheckoutPageComponent,
    SidebarComponent,
    PaginationComponent,
    AdminPageComponent,
    CardComponent,
    ModalComponent,
    OrderPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
        allowedDomains: ['your-api-domain.com'], // Replace with your API domain
        disallowedRoutes: ['your-api-domain.com/auth'], // Replace with routes that should not include the token
      },
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

//loaded from main.ts file, makes angular aware of app component
