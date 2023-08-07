import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss']
})
export class CheckoutPageComponent {

  constructor(private router: Router){}

  navigateToCheckoutPage(){
    this.router.navigate(['app-checkout-page']);
  }
}
