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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router,
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
          if (role === 'Admin') {
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
    this.snackBar
        .open('You must be an admin to access this page', 'Login', {
          panelClass: 'my-custom-snackbar'
        })
        .onAction()
        .subscribe(() => {
          this.router.navigate(['/app-homepage']);
        });
    return false;
  }
}
