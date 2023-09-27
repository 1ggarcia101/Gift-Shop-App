import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { environment } from 'src/environments/environment.development';
import { CreatePaymentRequest } from '../models/createPaymentRequest';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private url = environment.apiURL;
  private purchaseUrl = '/Payments/create-payment';

  constructor(private http: HttpClient) {}

  createPayment(paymentRequest: CreatePaymentRequest): Observable<any> {
    debugger
    return this.http.post<Payment>(this.url + this.purchaseUrl, paymentRequest);
  }
}
