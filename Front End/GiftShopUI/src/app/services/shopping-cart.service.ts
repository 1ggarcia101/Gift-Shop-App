import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cartItems: any[] = [];
  cartItems$ = new BehaviorSubject<any[]>(this.cartItems);

  constructor(private http: HttpClient) { }

  createOrder(order: Order) {
    return this.http.post<Order>('api/orders', order); // Replace with your API endpoint
  }

  addToCart(item: any) {
    this.cartItems.push(item);
    this.cartItems$.next(this.cartItems);
  }

  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartItems$.next(this.cartItems);
  }

  getTotalCost() {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }
}

