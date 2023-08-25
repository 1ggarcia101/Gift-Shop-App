import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent {
  cartItems$: Observable<any[]>; 

  constructor(
    private router: Router,
    private _cartservice: ShoppingCartService
  ){
    this.cartItems$ = this._cartservice.cartItems$;
  }

  navigateToShoppingCartPage(){
    this.router.navigate(['app-shopping-cart-page']);
  }

  removeFromCart(index: number) {
    this._cartservice.removeFromCart(index);
  }

  
}
