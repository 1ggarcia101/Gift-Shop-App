import { Injectable } from '@angular/core';
import { GiftShopUser } from '../models/giftShopUser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserSignupService {

  private url = environment.apiURL;
  private _register = "/GiftShopUsers/register"

  constructor(private http: HttpClient) { }

  addUser(user:GiftShopUser): Observable<any> {
    debugger
    const headers = { 'content-type': 'application/json'}  
    return this.http.post(this.url + this._register, user, {'headers':headers})
  }
}
