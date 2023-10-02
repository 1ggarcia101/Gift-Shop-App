import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddToCartRequest } from 'src/app/models/addToCartRequest';

@Component({
  selector: 'app-single-product-page',
  templateUrl: './single-product-page.component.html',
  styleUrls: ['./single-product-page.component.scss'],
})
export class SingleProductPageComponent implements OnInit {
  product: AdminProduct = {};
  isUserRegisteredOrAdmin: boolean = false;
  userId: number | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private adminService: AdminService,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const productId = this.route.snapshot.params['productId'];
    if (productId) {
      this.fetchProductDetails(productId);
    }

    this.checkUserStatus();

    this.userId = this.authService.getUserId() ?? -1;
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
    if (this.isUserRegisteredOrAdmin) {
      // Check if the product and product.productId are defined
      if (product && product.productId !== undefined) {
        // User is registered or admin, create a CartItem
        const cartItem = {
          productId: product.productId,
          quantity: 1, // Adjust the quantity as needed
        };

        // Make sure this.userId is defined before using it
        if (this.userId) {
          // Create an AddToCartRequest with the userId and CartItem
          const addToCartRequest: AddToCartRequest = {
            userId: this.userId,
            cartItems: [cartItem],
          };

          // Add to the database cart
          this.shoppingCartService.addToDatabaseCart(addToCartRequest);

          // Show an alert message
          window.alert('Item added to the cart!');

          // Redirect to the homepage
          this.router.navigate(['/']); // Replace '/' with your homepage route
        } else {
          console.error('userId is not defined.');
        }
      } else {
        console.error('Product or productId is undefined.');
      }
    } else {
      // User is unregistered, add to local storage
      this.addToLocalStorage(product);
    }
  }

  addToLocalStorage(product: AdminProduct): void {
    // User is unregistered, add to local storage
    this.shoppingCartService.addToLocalStorage(product);

    window.alert('Item added to the cart!');

    // Redirect to the homepage
    this.router.navigate(['/']); // Replace '/' with your homepage route
  }

  addToDatabaseCart(request: AddToCartRequest): void {
    // Add to the database cart
    this.shoppingCartService.addToDatabaseCart(request);
  }

  // Helper method to check user status
  private checkUserStatus(): void {
    // Use your authentication service to check if the user is registered or an admin
    this.isUserRegisteredOrAdmin = this.authService.isUserRegisteredOrAdmin();
  }
}
