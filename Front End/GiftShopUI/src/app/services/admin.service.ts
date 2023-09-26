import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable, of, map } from 'rxjs';
import { AdminProduct } from '../models/adminProducts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService implements OnInit {
  private url = environment.apiURL;
  private _login = '/Products';
  private _product = '/Products';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  getAdminProductsAndCount() {
    return this.http.get<AdminProduct[]>(this.url + this._login).pipe(
      map((products) => ({
        products,
        totalProducts: products.length, // Assuming you return the total count from the server
      }))
    );
  }

  submitNewProduct(product: AdminProduct): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.post(this.url + this._product, product, {
      headers: headers,
    });
  }

  deleteAdminProduct(productId: number): Observable<any> {
    return this.http.delete(this.url + this._product + `/${productId}`);
  }

  editAdminProduct(editedProductData: AdminProduct): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    return this.http.put(this.url + this._product, editedProductData, {
      headers: headers,
    });
  }

  getAdminProductsByCategory(category: string): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(this.url + this._product, {
      params: { category },
    });
  }

  searchAdminProducts(searchTerm: string): Observable<AdminProduct[]> {
    return this.http.get<AdminProduct[]>(this.url + this._product, {
      params: { searchTerm },
    });
  }

  getProductById(productId: number): Observable<AdminProduct | null> {
    const productUrl = `${this.url}${this._product}/${productId}`;

    return this.http.get<AdminProduct>(productUrl).pipe(
      catchError((error) => {
        console.error('Error fetching product by ID:', error);
        return of(null);
      })
    );
  }
}
