import { Component, Input, OnInit } from '@angular/core';
import { GiftShopUser } from 'src/app/models/giftShopUser';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit{
  @Input() user!: GiftShopUser;

  constructor(){}

  ngOnInit(): void {}

  updateUser(user: GiftShopUser){}

  deleteUser(user: GiftShopUser){}

  createUser(user: GiftShopUser){}

}
