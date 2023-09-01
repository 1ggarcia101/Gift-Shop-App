import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GiftShopUser } from '../models/giftShopUser';
import { UserLoginService } from './user-login.service';
import { UserSignupService } from './user-signup.service';

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
    private userSignupService: UserSignupService
  ) {
    this.isAuthenticatedSubject.next(!!this.getToken());
  }

  loginUser(response: any) {
    debugger;
    if (!response.success) {
      return;
    }

    const token = response.token; // adjust this based on your API response
    localStorage.setItem(this.TOKEN_KEY, token);
    this.isAuthenticatedSubject.next(true);
    this.firstNameSubject.next(response.firstName); // Update the first name

    // return this.userLoginService.loginUser(user).pipe(
    //   tap((response) => {
    //     const token = response.user.token; // adjust this based on your API response
    //     localStorage.setItem(this.TOKEN_KEY, token);
    //     this.isAuthenticatedSubject.next(true);
    //     this.firstNameSubject.next(response.firstName); // Update the first name
    //   }),
    //   catchError(error => {
    //     console.error('Login error:', error);
    //     throw error;
    //   })
    // );
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
    // Optionally, you can also redirect the user to the login page
    // or perform any other cleanup tasks.
  }

  getFirstName(): Observable<string> {
    return this.firstNameSubject.asObservable();
  }
}
