import { Injectable } from '@angular/core';
import { GiftShopUser } from '../models/giftShopUser';

@Injectable({
  providedIn: 'root'
})
export class GiftShopUserService {

  constructor() { }

  public getGiftShopUsers() : GiftShopUser[] {
    let user = new GiftShopUser();
    user.id = 1;
    user.firstName = "George";
    user.lastName = "Smith";
    user.email = "dsfg@gift.com";
    user.password = "sdfhdfgh";
    user.userType = "Customer";

    return [user];
  }
}
