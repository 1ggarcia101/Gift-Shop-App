import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss']
})
export class SingleProductPageComponent {
  constructor (private router: Router){}

  navigateToSingleProductPage(){
    this.router.navigate(['app-single-product-page']);
  }
}
