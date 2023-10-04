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
    this.userId = this.authService.getUserId();

    if (this.isUserRegisteredOrAdmin === true) {
      this.cartItemsDatabase$ = this._cartservice.getCartItemsFromDatabase(
        this.userId
      );

      // Subscribe to cartItemsDatabase$ to calculate subtotal and total
      this.cartItemsDatabase$.subscribe((items) => {
        this.calculateSubtotalAndTotal(items);
      });
    } else {
      this.cartItemsLocalStorage$ = of(
        this._cartservice.getCartItemsFromLocalStorage()
      );

      // Subscribe to cartItemsLocalStorage$ to calculate subtotal and total
      this.cartItemsLocalStorage$.subscribe((items) => {
        this.calculateSubtotalAndTotal(items);
      });
    }
  }

  navigateToShoppingCartPage() {
    this.router.navigate(['app-shopping-cart-page']);
  }

  removeFromCart(item: any) {
    this._cartservice.removeFromCart(item);
    location.reload();
  }

  incrementQuantity(item: any): void {
    item.productQuantity++;
    this._cartservice.addToLocalStorage(item);
    // Calculate the new subtotal and total based on the updated local storage items
    this.calculateSubtotalAndTotal(
      this._cartservice.getCartItemsFromLocalStorage()
    );
  }

  decrementQuantity(item: any): void {
    if (item.productQuantity > 1) {
      item.productQuantity--;
      console.log('Decremented item:', item);
      this._cartservice.subtractFromLocalStorage(item);
      // Calculate the new subtotal and total based on all items in the cart
      const updatedItems = this._cartservice.getCartItemsFromLocalStorage();
      console.log('Updated items after decrement:', updatedItems);
      this.calculateSubtotalAndTotal(updatedItems);
    } else {
      // If the quantity is already 1, remove the item from the cart
      this.removeFromCart(item);
    }
  }

  private calculateSubtotalAndTotal(items: any[]): void {
    // Log each item individually for inspection
    items.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, item);
    });

    this.subtotal = items.reduce((acc, item) => {
      return acc + item.productPrice * item.productQuantity;
    }, 0);

    // Calculate total by adding subtotal and shipping
    this.total = this.subtotal + this.shipping;
  }

  calculateTotalQuantity(items: any[]): number {
    return items.reduce((total, item) => total + item.productQuantity, 0);
  }

  incrementQuantityDatabase(userId: number, productId: number) {
    this._cartservice
      .incrementCartItemQuantity(userId, productId)
      .subscribe((response) => {
        this.calculateSubtotalAndTotal(response);
      });
    location.reload();
  }

  decrementQuantityDatabase(userId: number, productId: number) {
    this._cartservice
      .decrementCartItemQuantity(userId, productId)
      .subscribe((response) => {});
    location.reload();
  }

  deleteItemDatabase(userId: number, productId: number) {
    this._cartservice
      .deleteCartItem(userId, productId)
      .subscribe((response) => {});
    location.reload();
  }
}
