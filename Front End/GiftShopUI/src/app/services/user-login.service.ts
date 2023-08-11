import { Injectable } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { GiftShopUser } from '../models/giftShopUser';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  private url = environment.apiURL

  constructor(private http: HttpClient) { }

  getUsers():Observable<GiftShopUser[]> {
    return this.http.get<GiftShopUser[]>(this.url)
      .pipe(catchError(this.handleError<GiftShopUser[]>('getUsers', [])))
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }


}
