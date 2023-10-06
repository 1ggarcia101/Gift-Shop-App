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
  private _convertCart = '/Cart/convert-cart';

  private _incrementCart = '/Cart/increment-cart-item';
  private _decrementCart = '/Cart/decrement-cart-item';
  private _deleteCart = '/Cart/delete-cart';
  private _deleteCartItem = '/Cart/delete-cart-item';

  constructor(private http: HttpClient) {
    const storedCartItems = localStorage.getItem(this.cartItemsKey);
    if (storedCartItems) {
      this.cartItems = JSON.parse(storedCartItems);
      this.cartItems$.next(this.cartItems);
    }
  }

  ngOnInit(): void{
    console.log(this.cartItems$);
  }

  updateLocalStorage() {
    localStorage.setItem(this.cartItemsKey, JSON.stringify(this.cartItems));
  }

  createOrder(order: Order) {
    return this.http.post<Order>('api/Orders', order);
  }

  addToLocalStorage(product: AdminProduct) {
    let cartList: AdminProduct[] = this.getCartItemsFromLocalStorage();

    let tempProd: AdminProduct | undefined = cartList.find(
      (prod) => prod.productId === product.productId
    );

    if (tempProd) {
      // Increment the product quantity if it already exists
      tempProd.productQuantity = (tempProd.productQuantity || 0) + 1; // Use a default value of 0 if productQuantity is undefined
    } else {
      // Add the product to the cart list
      product.productQuantity = 1; // Initialize quantity to 1
      cartList.push(product);
    }

    // Update the cartItems array in the service
    this.cartItems = cartList;

    // Update both local storage and the cartItems$ BehaviorSubject
    localStorage.setItem(this.cartItemsKey, JSON.stringify(cartList));
    this.cartItems$.next(cartList);
  }

  subtractFromLocalStorage(product: AdminProduct) {
    let cartList: AdminProduct[] = this.getCartItemsFromLocalStorage();

    let tempProd: AdminProduct | undefined = cartList.find(
      (prod) => prod.productId === product.productId
    );

    // Ensure tempProd and productQuantity are defined
    if (tempProd && typeof tempProd.productQuantity === 'number') {
      // Decrement the product quantity if it already exists and it's greater than 1
      if (tempProd.productQuantity > 1) {
        tempProd.productQuantity--;
      } else {
        // Remove the product from the cart list if quantity is 1
        cartList = cartList.filter(
          (prod) => prod.productId !== product.productId
        );
      }

      // Update the cartItems array in the service
      this.cartItems = cartList;

      // Update both local storage and the cartItems$ BehaviorSubject
      localStorage.setItem(this.cartItemsKey, JSON.stringify(cartList));
      this.cartItems$.next(cartList);
    }
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
    this.cartItems = this.cartItems.filter(
      (item) => item.productId !== itemToRemove.productId
    );
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

  incrementCartItemQuantity(
    userId: number,
    productId: number
  ): Observable<any> {
    const url = `${this.url}${this._incrementCart}/${userId}/${productId}`;
    return this.http.post(url, null);
  }

  decrementCartItemQuantity(
    userId: number,
    productId: number
  ): Observable<any> {
    const url = `${this.url}${this._decrementCart}/${userId}/${productId}`;
    return this.http.post(url, null);
  }

  deleteCartItem(userId: number, productId: number): Observable<any> {
    const url = `${this.url}${this._deleteCartItem}/${userId}/${productId}`;
    return this.http.delete(url);
  }

  deleteCart(userId: number): Observable<any> {
    const url = `${this.url}${this._deleteCart}/${userId}/`;
    return this.http.delete(url);
  }

  clearLocalStorageCart() {
    localStorage.removeItem(this.cartItemsKey);
    this.cartItems$.next([]);
  }

  convertLocalStorageCartToDatabaseCart(userId: number): Observable<any> {
    let cartList: AdminProduct[] = this.getCartItemsFromLocalStorage();

    // Check if there are items in the local storage cart
    if (cartList.length > 0) {
      // Prepare the request body to send to the server
      const request = {
        userId: userId,
        cartItems: cartList, 
      };


      const convertUrl = `${this.url}${this._convertCart}/${userId}`;

      // Send the request to your API to convert the cart
      return this.http.post(convertUrl, request);
    }

    // If there are no items in the local storage cart, return an empty observable or handle it as needed
    return new Observable<any>();
  }
}
