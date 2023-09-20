import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent {
  cartItemsDatabase$: Observable<any[]> = of([]);
  cartItemsLocalStorage$: Observable<any[]> = of([]);
  cartItems$: Observable<any[]>;
  subtotal: number = 0;
  shipping: number = 5;
  total: number = 0;
  isUserRegisteredOrAdmin: boolean = false;
  userId: number = 0;

  constructor(
    private router: Router,
    private _cartservice: ShoppingCartService,
    private authService: AuthService
  ) {
    this.cartItems$ = this._cartservice.cartItems$;
  }

  ngOnInit() {
    this.isUserRegisteredOrAdmin = this.authService.isUserRegisteredOrAdmin();

    // Get the user ID from your authentication service
    this.userId = this.authService.getUserId();

    if (this.userId !== 0) {
      // Fetch cart items from the database here for registered users
      this.cartItemsDatabase$ = this._cartservice.getCartItemsFromDatabase(
        this.userId
      );
    } else {
      // Fetch cart items from local storage here for unregistered users
      this.cartItemsLocalStorage$ = of(
        this._cartservice.getCartItemsFromLocalStorage()
      );
    }

    this.cartItems$.subscribe((items) => {
      this.calculateSubtotalAndTotal(items);
    });
  }

  navigateToShoppingCartPage() {
    this.router.navigate(['app-shopping-cart-page']);
  }

  removeFromCart(item: any) {
    this._cartservice.removeFromCart(item);
    location.reload();
  }

  incrementQuantity(item: any): void {
    debugger;
    item.productQuantity++;
    this._cartservice.updateLocalStorage();
    this.calculateSubtotalAndTotal(item);
  }

  decrementQuantity(item: any): void {
    debugger;
    if (item.productQuantity > 1) {
      item.productQuantity--;
      this._cartservice.updateLocalStorage();
      this.calculateSubtotalAndTotal(item);
    }
  }

  private calculateSubtotalAndTotal(items: any[]): void {
    this.subtotal = items.reduce((acc, item) => {
      return acc + item.productPrice * item.productQuantity;
    }, 0);

    // Calculate total by adding subtotal and shipping
    this.total = this.subtotal + this.shipping;
  }

  incrementQuantityDatabase(userId: number, productId: number) {
    this._cartservice
      .incrementCartItemQuantity(userId, productId)
      .subscribe((response) => {
        // Handle the response as needed
        // You may want to update the cart items displayed in the component
      });
    location.reload();
  }

  decrementQuantityDatabase(userId: number, productId: number) {
    this._cartservice
      .decrementCartItemQuantity(userId, productId)
      .subscribe((response) => {
        // Handle the response as needed
        // You may want to update the cart items displayed in the component
      });
    location.reload();
  }

  deleteItemDatabase(userId: number, productId: number) {
    this._cartservice
      .deleteCartItem(userId, productId)
      .subscribe((response) => {
        // Handle the response as needed
        // You may want to update the cart items displayed in the component
      });
    location.reload();
  }
}
