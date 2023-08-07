import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss']
})
export class ShoppingCartPageComponent {

  constructor(private router: Router){}

  navigateToShoppingCartPage(){
    this.router.navigate(['app-shopping-cart-page']);
  }
}
