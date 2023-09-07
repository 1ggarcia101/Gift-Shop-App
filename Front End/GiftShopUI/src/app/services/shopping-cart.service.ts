import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItemsKey = 'cartItems';
  private cartItems: any[] = [];
  cartItems$ = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {
    // Load cart items from Local Storage during service initialization
    const storedCartItems = localStorage.getItem(this.cartItemsKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItems$.next(this.cartItems);
    }
  }

  private updateLocalStorage() {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(this.cartItems));
  }

  createOrder(order: Order) {
    return this.http.post<Order>('api/Orders', order);
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartItems$.next(this.cartItems);
    this.updateLocalStorage(); // Save to Local Storage
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartItems$.next(this.cartItems);
    this.updateLocalStorage(); // Save to Local Storage
  }

  getTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}
