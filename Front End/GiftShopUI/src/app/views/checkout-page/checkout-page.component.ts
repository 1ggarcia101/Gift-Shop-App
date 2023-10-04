import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderItem } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';
import { CreateOrderRequest } from 'src/app/models/createOrderRequest';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { CreatePaymentRequest } from 'src/app/models/createPaymentRequest';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
})
export class CheckoutPageComponent {
  cartItems: OrderItem[] = []; 
  shippingCost: number = 20; 
  taxRate: number = 0.1; // Tax rate as a decimal (e.g., 0.1 for 10%)

  cardNumber: string = '';
  nameOnCard: string = '';
  expirationDate: string = '';
  cvv: string = '';

  constructor(
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private cartService: ShoppingCartService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Fetch cart items for the current user from the service's database method
    const userId = this.authService.getUserId();
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

    console.log(orderData);

    this.orderService.makePurchase(orderData).subscribe(
      (createdOrder) => {
        window.alert(
          'Purchase successful! Your order ID is ' + createdOrder.orderId
        );

        const orderId = createdOrder.orderId;
        this.submitPayment(orderId);

        this.router.navigate(['app-homepage']);
      },
      (error) => {
        console.error('Purchase error:', error);
      }
    );

    this.clearCartAfterPurchase();
  }

  submitPayment(orderId: number) {
    // Create paymentData using the payment form inputs and the orderId
    const paymentData: CreatePaymentRequest = {
      cardNumber: this.cardNumber,
      nameOnCard: this.nameOnCard,
      expirationDate: this.expirationDate,
      cvv: this.cvv,
      orderId: orderId,
    };

    this.paymentService.createPayment(paymentData).subscribe(
      (createdPayment) => {
        console.log('Payment created:', createdPayment);
      },
      (error) => {
        console.error('Error creating payment:', error);
      }
    );
  }

  clearCartAfterPurchase() {
    const userId = this.authService.getUserId();

    this.cartService.deleteCart(userId).subscribe(
      (response) => {
        console.log('Cart cleared successfully:', response);

        this.cartService.updateCartItems([]);
      },
      (error) => {
        console.error('Error clearing cart:', error);
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
