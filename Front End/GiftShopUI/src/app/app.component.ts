import { Component } from '@angular/core';
import { GiftShopUser } from './models/giftShopUser';
import { GiftShopUserService } from './services/gift-shop-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GiftShopUI';
  users: GiftShopUser[] = [];

  constructor(private giftShopUserService: GiftShopUserService){}

  ngOnInit() : void{
    this.giftShopUserService
    .getGiftShopUsers()
    .subscribe((result: GiftShopUser[]) => (this.users = result));
  }
}
