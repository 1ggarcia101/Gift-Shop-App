import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftShopUser } from 'src/app/models/giftShopUser';
import { UserSignupService } from 'src/app/services/user-signup.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit{

  signupObj: GiftShopUser = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 1
  }

  constructor (
    private router: Router,
    private _userSignupService: UserSignupService
    ){}

  navigateToSignupPage(){
    this.router.navigate(['app-signup-page']);
  }

  ngOnInit(): void {
    
  }

  public onRegister(){
    this._userSignupService.addUser(this.signupObj).subscribe(
      res => {
        console.log(res)
        // redirect
        // msg succefull
        // ...
      },
    )
  }

}
