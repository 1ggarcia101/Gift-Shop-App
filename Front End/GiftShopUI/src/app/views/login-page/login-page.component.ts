import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftShopUser } from 'src/app/models/giftShopUser';
import { UserLoginService } from 'src/app/services/user-login.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

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

  errorMessage: string = '';

  constructor (
    private router: Router,
    private _userLoginService: UserLoginService
    ){}


  ngOnInit(): void {
    
  }

  public onLogin(){
    this._userLoginService.loginUser(this.loginObj)
      .subscribe(
        (response) => {
          if (response.Success) {
            console.log('Login successful:', response.Message);

            // Extract the token from the response
            const token = response.Token;

            // Store the token, navigate to another page, etc.
          } else {
            // Handle unsuccessful login (incorrect credentials, user not found, etc.)
            console.error('Login error:', response.Message);
            this.errorMessage = response.Message; // Display the error message to the user
          }
        },
        (error: HttpErrorResponse) => {
          // Handle network or other errors
          console.error('Login error:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      );
  }
}
