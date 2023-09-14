import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';
import { AdminProduct } from '../models/adminProducts';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItemsKey = 'cartItems';
  private cartItems: any[] = [];
  cartItems$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    const storedCartItems = localStorage.getItem(this.cartItemsKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItems$.next(this.cartItems);
    }
  }

  updateLocalStorage() {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(this.cartItems));
  }

  createOrder(order: Order) {
    return this.http.post<Order>('api/Orders', order);
  }

  addtoCartV2(product: AdminProduct) {
    let cartList: AdminProduct[] = [];
    // search in localstorge
    if (!localStorage.getItem('cartItems')) {
      cartList.push(product);
      localStorage.setItem('cartItems', JSON.stringify(cartList));
      return;
    }

    // Get from localStorage
    cartList = JSON.parse(localStorage.getItem('cartItems') + '');
    // it's the same item ??
    let tempProd: any = cartList.find(
      (prod) => prod.productId == product.productId
    );
    if (tempProd) {
      // retrive the product and plus 1
      tempProd.productQuantity += 1;
    } else {
      cartList.push(product);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartList));
  }

  addToCart(product: AdminProduct) {
    const currentCartItems = this.cartItems$.value;
    const existingItem = currentCartItems.find(
      (item) => item.id === product.productId
    );

    if (existingItem) {
      // Product already exists in the cart
      if (existingItem.quantity < (product.productQuantity as number)) {
        // Type assertion
        // Check if there is enough available quantity
        existingItem.quantity += 1; // Increment quantity
      }
    } else {
      // Product doesn't exist in the cart, add it with quantity 1
      currentCartItems.push({ ...product, quantity: 1 });
    }

    // Update the cart items in the BehaviorSubject
    this.cartItems$.next([...currentCartItems]);

    // Update the local storage as well
    this.updateLocalStorage();
  }

  updateCartItems(newCartItems: any[]) {
    // Set the cart items to the new array of items
    this.cartItems$.next([...newCartItems]);

    // Update the local storage as well
    this.updateLocalStorage();
  }

  removeFromCart(itemToRemove: any) {
    this.cartItems = this.cartItems.filter((item) => item !== itemToRemove);
    this.cartItems$.next(this.cartItems);
    this.updateLocalStorage();
  }

  getTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
