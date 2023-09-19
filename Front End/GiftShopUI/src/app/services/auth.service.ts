import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GiftShopUser } from '../models/giftShopUser';
import { UserLoginService } from './user-login.service';
import { UserSignupService } from './user-signup.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  private readonly TOKEN_KEY = 'auth_token';
  private firstNameSubject = new BehaviorSubject<string>('');

  constructor(
    private userLoginService: UserLoginService,
    private userSignupService: UserSignupService,
    private jwtHelper: JwtHelperService
  ) {
    this.isAuthenticatedSubject.next(!!this.getToken());
  }

  loginUser(response: any) {
    if (!response.success) {
      return;
    }

    const token = response.token;
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
    this.firstNameSubject.next(response.firstName);
  }

  signupUser(user: GiftShopUser): Observable<any> {
    return this.userSignupService.addUser(user).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
      }),
      catchError((error) => {
        console.error('Signup error:', error);
        throw error;
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticatedSubject.next(false);
  }

  getFirstName(): Observable<string> {
    return this.firstNameSubject.asObservable();
  }

  isUserRegisteredOrAdmin(): boolean {
    const token = localStorage.getItem('auth_token'); // Get the JWT token from local storage
    if (token) {
      // Decode the JWT token to access claims
      const decodedToken = this.jwtHelper.decodeToken(token);

      const userClaims =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ];
      if (
        userClaims &&
        Array.isArray(userClaims) &&
        userClaims.includes('Admin')
      ) {
        return true; // User is an admin
      } else if (
        userClaims &&
        Array.isArray(userClaims) &&
        userClaims.includes('Registered')
      ) {
        return true; // User is registered (adjust this based on your roles)
      }
    }
    return false; // User is neither registered nor an admin
  }

  getUserId(): number | null {
    const token = localStorage.getItem('auth_token'); // Get the JWT token from local storage
    if (token) {
      // Decode the JWT token to access claims
      const decodedToken = this.jwtHelper.decodeToken(token);

      // Extract the user ID from the claim
      const userClaims =
        decodedToken[
          'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ];

      if (userClaims && userClaims.length >= 3) {
        const userId = parseInt(userClaims[2], 10); // Convert the string to a number
        if (!isNaN(userId)) {
          return userId;
        }
      }
    }

    return null; // User ID not found or not a valid number
  }
}
