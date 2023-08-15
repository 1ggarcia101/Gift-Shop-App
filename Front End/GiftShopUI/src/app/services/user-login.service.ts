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
  private _login = "/GiftShopUsers/login"

  constructor(private http: HttpClient) { }

  loginUser(user: GiftShopUser): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    return this.http.post(this.url + this._login, user, {'headers':headers})
  }


}
