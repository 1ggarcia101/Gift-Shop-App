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
          const role = rolesClaim[2]; // Access the value at the 3rd index
          if (role === 'Admin' || role === 'Registered') {
            // User is an admin, allow access to the admin page
            return true;
          }
        }
      } catch (error) {
        console.error('Token Decoding Error:', error);
      }
    }

    this.unauthorizedAccess = true;

    // If not authenticated or not an admin, redirect to a different route (e.g., login)
    this.router.navigate(['/app-homepage']); // Change this route as needed
    if (this.unauthorizedAccess == true) {
      console.log('You must be a registered user to access this page.');
    }
    return false;
  }
}
