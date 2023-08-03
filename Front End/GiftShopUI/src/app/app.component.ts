import { Component } from '@angular/core';
import { GiftShopUser } from './models/giftShopUser';
import { GiftShopUserService } from './services/gift-shop-user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GiftShopUI';
  users: GiftShopUser[] = [];
  userToEdit!: GiftShopUser;

  constructor(private modalService: NgbModal){}

  public open(modal: any): void{
    this.modalService.open(modal);
  }

//root component of application -- top of component hierarchy

  // ngOnInit() : void{
  //   this.giftShopUserService
  //   .getGiftShopUsers()
  //   .subscribe((result: GiftShopUser[]) => (this.users = result));
  // }

  // initNewUser(){
  //   this.userToEdit = new GiftShopUser();
  // }

  // editUser(user: GiftShopUser){
  //   this.userToEdit = user;
  // }
}
