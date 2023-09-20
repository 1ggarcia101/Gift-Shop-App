import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateOrderRequest } from 'src/app/models/createOrderRequest';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  cartItems: OrderItem[] = []; // Initialize with your actual cart items
  shippingCost: number = 20; // Shipping cost
  taxRate: number = 0.1; // Tax rate as a decimal (e.g., 0.1 for 10%)

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    // Fetch cart items for the current user from the service's database method
    const userId = this.authService.getUserId(); // Get the current user's ID
    this.cartService.getCartItemsFromDatabase(userId).subscribe(
      (cartItems) => {
        this.cartItems = cartItems;
      },
      (error) => {
        console.error('Error fetching cart items from database:', error);
      }
    );
  }

  onPurchaseClicked() {
    // Create an order object with the necessary data
    const orderData: CreateOrderRequest = {
      userId: this.authService.getUserId(),
      orderItems: this.cartItems,
    };

    // Call the purchase service to make the purchase request
    this.orderService.makePurchase(orderData).subscribe(
      (response) => {
        this.router.navigate(['app-homepage']);
      },
      (error) => {
        console.error('Purchase error:', error);
      }
    );
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  calculateTotal(): number {
    const subtotal = this.calculateSubtotal();
    const tax = subtotal * this.taxRate;
    return subtotal + tax + this.shippingCost;
  }

  navigateToCheckoutPage() {
    this.router.navigate(['app-checkout-page']);
  }
}
