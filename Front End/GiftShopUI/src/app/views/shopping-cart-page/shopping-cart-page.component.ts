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
  userId: number | null = null;

  constructor(
    private router: Router,
    private _cartservice: ShoppingCartService,
    private authService: AuthService
  ) {
    this.cartItems$ = this._cartservice.cartItems$;
  }

  ngOnInit() {
    debugger
    this.isUserRegisteredOrAdmin = this.authService.isUserRegisteredOrAdmin();
    this.userId = this.authService.getUserId(); // Get the user ID from your authentication service

    if (this.userId !== null) {
      // Fetch cart items from the database here for registered users
      this.cartItemsDatabase$ = this._cartservice.getCartItemsFromDatabase(this.userId);
    } else {
      // Fetch cart items from local storage here for unregistered users
      this.cartItemsLocalStorage$ = of(this._cartservice.getCartItemsFromLocalStorage());
    }

    this.cartItems$.subscribe((items) => {
      this.cartItems$ = of(items); // Assign the cartItems$ observable
      this.calculateSubtotalAndTotal(items);
    });
  }

  navigateToShoppingCartPage() {
    this.router.navigate(['app-shopping-cart-page']);
  }

  removeFromCart(item: any) {
    debugger
    this._cartservice.removeFromCart(item);
  }

  incrementQuantity(item: any): void {
    debugger
    item.productQuantity++;
    this._cartservice.updateLocalStorage();
    this.calculateSubtotalAndTotal(item);
  }

  decrementQuantity(item: any): void {
    debugger
    if (item.productQuantity > 1) {
      item.productQuantity--;
      this._cartservice.updateLocalStorage();
      this.calculateSubtotalAndTotal(item);
    }
  }

  private calculateSubtotalAndTotal(items: any[]): void {
    debugger
    this.subtotal = items.reduce((acc, item) => {
      return acc + item.productPrice * item.productQuantity;
    }, 0);

    // Calculate total by adding subtotal and shipping
    this.total = this.subtotal + this.shipping;
  }
}
