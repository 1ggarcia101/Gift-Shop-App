import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { AdminProduct } from '../models/adminProducts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit{

  private url = environment.apiURL
  private _login = "/Products"
  private _product = "/Products"

  constructor(
    private http: HttpClient,
    ) { }

    ngOnInit(): void {
      
    }

  getAdminProducts(): Observable<any> {
    return this.http.get(this.url + this._login)
  }

  submitNewProduct(product:AdminProduct): Observable<any>{
      const headers = { 'content-type': 'application/json'}  
      return this.http.post(this.url + this._product, product, {'headers':headers})
  }

  deleteAdminProduct(productId: number): Observable<any> {
    return this.http.delete(this.url + this._product + `/${productId}`)
  }

  editAdminProduct(editedProductData: AdminProduct): Observable<any> {
    const headers = { 'content-type': 'application/json'}
    return this.http.put(this.url + this._product, editedProductData, {'headers':headers})
  }
}
