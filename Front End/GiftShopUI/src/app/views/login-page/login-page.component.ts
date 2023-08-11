import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GiftShopUser } from 'src/app/models/giftShopUser';
import { UserLoginService } from 'src/app/services/user-login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  navigateToLoginPage(){
    this.router.navigate(['app-login-page']);
  }

  signupObj: GiftShopUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 1
  }

  constructor (
    private router: Router,
    private _userLoginService: UserLoginService
    ){}


  ngOnInit(): void {
    
  }

  public onLogin(){
    this._userLoginService.getUsers().subscribe(
      res => {
        console.log(res)
        // redirect
        // msg succefull
        // ...
      },
    )
  }
}
