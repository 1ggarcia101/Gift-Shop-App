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

@Injectable({
  providedIn: 'root',
})
export class CheckoutGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jwtService: JwtService
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
        console.log(rolesClaim);

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

    const confirmation = window.confirm(
      'You need to create an account to access this page. Do you want to sign up now?'
    );

    if (confirmation) {
      // Redirect to the signup page
      this.router.navigate(['/app-signup-page']); // Adjust the actual route
    } else {
      // Redirect to another page or simply return false
      this.router.navigate(['/']); // Redirect to the homepage or another page
    }
    return false;
  }
}
