import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { CreateOrderRequest } from '../models/createOrderRequest';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private url = environment.apiURL;
  private purchaseUrl = '/Orders/create-order';

  constructor(private http: HttpClient) {}

  makePurchase(orderData: CreateOrderRequest): Observable<any> {
    return this.http.post(this.url + this.purchaseUrl, orderData);
  }
}
