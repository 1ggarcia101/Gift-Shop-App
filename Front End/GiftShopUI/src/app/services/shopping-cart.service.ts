import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../models/order';
import { HttpClient } from '@angular/common/http';
import { AdminProduct } from '../models/adminProducts';
import { UserType } from '../models/giftShopUser';
import { environment } from 'src/environments/environment.development';
import { AddToCartRequest } from '../models/addToCartRequest';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  private cartItemsKey = 'cartItems';
  private cartItems: any[] = [];
  cartItems$ = new BehaviorSubject<any[]>([]);

  private url = environment.apiURL;
  private _cart = '/Cart/add-to-cart';
  private _cartItemsUrl = '/Cart/get-cart-items';

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

  addToLocalStorage(product: AdminProduct) {
    debugger
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

  addToDatabaseCart(request: AddToCartRequest): void {
    this.http.post(this.url + this._cart, request).subscribe(
      (response) => {
        // Handle the response as needed
      },
      (error) => {
        console.error('Error adding to database cart:', error);
      }
    );
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

  getCartItemsFromLocalStorage(): any[] {
    const cartItems = localStorage.getItem('cartItems');
    return cartItems ? JSON.parse(cartItems) : [];
  }

  getCartItemsFromDatabase(userId: number): Observable<any[]> {
    const url = `${this.url}${this._cartItemsUrl}/${userId}`; // Adjust the URL to include the user ID
    return this.http.get<any[]>(url);
  }
  
}
