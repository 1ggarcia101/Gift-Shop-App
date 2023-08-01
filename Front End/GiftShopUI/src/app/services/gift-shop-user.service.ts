import { Injectable } from '@angular/core';
import { GiftShopUser } from '../models/giftShopUser';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class GiftShopUserService {
  private url = "GiftShopUsers"

  constructor(private http: HttpClient) { }

  public getGiftShopUsers() : Observable<GiftShopUser[]> {
    return this.http.get<GiftShopUser[]>(`${environment}/${this.url}`);
  }
}
