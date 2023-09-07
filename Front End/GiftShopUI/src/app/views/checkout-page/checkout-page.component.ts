import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/order';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  cartItems: OrderItem[] = []; // Initialize with your actual cart items
  shippingCost: number = 20; // Shipping cost
  taxRate: number = 0.1; // Tax rate as a decimal (e.g., 0.1 for 10%)

  constructor(private router: Router) {}

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
