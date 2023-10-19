import { Component, Input } from '@angular/core';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { AddToCartRequest } from 'src/app/models/addToCartRequest';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() product: AdminProduct = {}; // Input property to receive product data
  @Input() cardData: any[] = [];
  @Input() imageUrl: string = '';
  @Input() title: string = '';
  @Input() text: string = '';

  productData = {};
  isUserRegisteredOrAdmin: boolean = false;
  userId: number | undefined;

  constructor(
    private router: Router,
    private shoppingCartService: ShoppingCartService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.checkUserStatus();

    this.userId = this.authService.getUserId() ?? -1;
  }

  navigateToSingleProductPage(productId: number | undefined) {
    if (productId !== undefined) {
      this.router.navigate(['/app-single-product-page', productId]);
    }
  }

  addToCart(product: AdminProduct): void {
    if (this.isUserRegisteredOrAdmin) {
      // Check if the product and product.productId are defined
      if (product && product.productId !== undefined) {
        // User is registered or admin, create a CartItem
        const cartItem = {
          productId: product.productId,
          productQuantity: 1,
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

          this.snackBar
            .open('Item added to the cart!', 'Login', {
              panelClass: ['my-custom-snackbar'],
              verticalPosition: 'top'
            })
            .onAction()
            .subscribe(() => {
              this.router.navigate(['/']);
            });
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

    this.snackBar
      .open('Item added to the cart!', 'Login', {
        panelClass: ['my-custom-snackbar'],
        verticalPosition: 'top',
        horizontalPosition: 'center',
      })
      .onAction()
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  private checkUserStatus(): void {
    // Use your authentication service to check if the user is registered or an admin
    this.isUserRegisteredOrAdmin = this.authService.isUserRegisteredOrAdmin();
  }
}
