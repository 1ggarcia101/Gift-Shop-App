import { Component, Input } from '@angular/core';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() product: AdminProduct = {};// Input property to receive product data
  @Input() cardData: any[] = [];
  @Input() imageUrl: string = "";
  @Input() title: string = "";
  @Input() text: string = "";

  productData = {};

  constructor(private router: Router) {}

  navigateToSingleProductPage(productData: any) {
    this.router.navigate(['app-single-product-page'], {
      state: { product: productData }
    });
  }

}