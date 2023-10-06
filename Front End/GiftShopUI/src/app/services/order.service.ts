import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CreateOrderRequest } from '../models/createOrderRequest';
import { Order } from '../models/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = environment.apiURL;
  private purchaseUrl = '/Orders/create-order';
  private ordersUrl = '/Orders';

  constructor(private http: HttpClient) {}

  makePurchase(orderData: CreateOrderRequest): Observable<any> {
    return this.http.post(this.url + this.purchaseUrl, orderData);
  }

  getOrdersByUserId(userId: number): Observable<any> {
    return this.http.get<any>(`${this.url}${this.ordersUrl}/user/${userId}`);
    // return this.http.get(`${this.url}${this.ordersUrl}/${orderId}`)
    //   .toPromise()
    //   .then( (res) => <any> res)
    //   .then(data => {return data});

  }
}
