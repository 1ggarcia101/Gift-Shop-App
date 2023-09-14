import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss'],
})
export class SingleProductPageComponent implements OnInit {
  product: AdminProduct = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];
    if (productId) {
      this.fetchProductDetails(productId);
    }
  }

  fetchProductDetails(productId: number): void {
    if (productId) {
      this.adminService.getProductById(productId).subscribe(
        (data: AdminProduct | null) => {
          if (data !== null) {
            this.product = data;
          } else {
          }
        },
        (error) => {
          console.error('Error fetching product details:', error);
        }
      );
    }
  }

  addToCart(product: AdminProduct): void {
    //add if else to account for duplicate items 
    this.shoppingCartService.addtoCartV2(product);
  }
}
