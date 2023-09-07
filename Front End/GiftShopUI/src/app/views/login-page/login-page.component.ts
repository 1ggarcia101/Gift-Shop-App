import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftShopUser } from 'src/app/models/giftShopUser';
import { UserLoginService } from 'src/app/services/user-login.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  navigateToLoginPage() {
    this.router.navigate(['app-login-page']);
  }

  loginObj: GiftShopUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 1,
  };

  constructor(
    private router: Router,
    private _userLoginService: UserLoginService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {}

  public onLogin() {
    this._userLoginService
      .loginUser(this.loginObj)
      .pipe(
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(error);
        })
      )
      .subscribe((res) => {
        console.log('Login successful', res);

        this._authService.loginUser(res);

        this.router.navigate(['app-homepage']);
      });
  }
}
