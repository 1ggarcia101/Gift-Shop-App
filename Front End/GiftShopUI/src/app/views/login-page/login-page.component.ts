import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftShopUser } from 'src/app/models/giftShopUser';
import { UserLoginService } from 'src/app/services/user-login.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit{

  navigateToLoginPage(){
    this.router.navigate(['app-login-page']);
  }

  loginObj: GiftShopUser = {
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
    this._userLoginService.loginUser(this.loginObj)
      .pipe(
        catchError(error => {
          console.error('Login error:', error);
          return throwError(error);
        })
      )
      .subscribe(() => {
        console.log('Login successful');
        // Redirect to another page or perform other actions
      });
  }
}
