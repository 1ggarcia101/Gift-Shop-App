import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GiftShopUser } from 'src/app/models/giftShopUser';
import { UserSignupService } from 'src/app/services/user-signup.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss'],
})
export class SignupPageComponent implements OnInit {
  signupForm: FormGroup;

  signupObj: GiftShopUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userType: 1,
  };

  constructor(
    private router: Router,
    private userSignupService: UserSignupService,
    private cartService: ShoppingCartService,
    private jwtService: JwtService
  ) {
    // Initialize the form group and controls
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ),
      ]),
      password: new FormControl('', Validators.required),
    });
  }

  navigateToSignupPage() {
    this.router.navigate(['app-signup-page']);
  }

  ngOnInit(): void {}

  public onRegister() {
    // Check if the form is valid
    if (this.signupForm.valid) {
      // Extract form values
      const formValues = this.signupForm.value as GiftShopUser;

      // Call the service to add the user
      this.userSignupService.addUser(formValues).subscribe(
        (res) => {
          // Ensure that the user ID is correctly retrieved from the registration response
          const token = res.token; // Assuming the token is returned as "Token" in the response

          if (token) {
            // Store the token in local storage
            localStorage.setItem('auth_token', token);

            // Decode the token to get the user ID
            const decodedToken = this.jwtService.decodeToken(token);
            const userClaims =
              decodedToken[
                'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
              ];
            const userId = parseInt(userClaims[2], 10);

            // Now, you have the user ID and can proceed with other operations, such as cart conversion
            this.convertLocalStorageCart(userId);
            this.cartService.clearLocalStorageCart();
            this.router.navigate(['app-homepage']);
          } else {
            console.error('Token is missing in the registration response.');
            // Handle the error or missing token as needed
          }
        },
        (error) => {
          console.error('Error registering user:', error);
          // Handle the error as needed
        }
      );
    } else {
      // Form is invalid, show an error message or handle it as needed
      console.log('Form is invalid. Please check your input.');
    }
  }

  private convertLocalStorageCart(userId: number) {
    this.cartService.convertLocalStorageCartToDatabaseCart(userId).subscribe(
      (conversionResult) => {
        console.log('Cart conversion result:', conversionResult);
      },
      (conversionError) => {
        console.error('Error converting cart:', conversionError);
      }
    );
  }
}
