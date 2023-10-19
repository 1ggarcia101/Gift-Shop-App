import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtService } from '../services/jwt.service';
import { ShoppingCartService } from '../services/shopping-cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService,
    private cartService: ShoppingCartService,
    private snackBar: MatSnackBar
  ) {}

  unauthorizedAccess = false;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decodedToken = this.jwtService.decodeToken(token);
        const rolesClaim =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];

        // Check if the user is an admin
        if (rolesClaim && rolesClaim.length >= 3) {
          const role = rolesClaim[3]; // Access the value at the 3rd index
          if (role === 'Admin' || role === 'Registered') {
            // User is an admin, allow access to the admin page
            return true;
          }
        }
      } catch (error) {
        console.error('Token Decoding Error:', error);
      }
    }

    this.snackBar
        .open('You must be logged in to access this page', 'Login', {})
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/app-signup-page']);
        });

    return false;
  }
}
