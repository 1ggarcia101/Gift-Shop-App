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
export class AdminGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decodedToken = this.jwtService.decodeToken(token);
        const userTypeClaim = decodedToken['user_type'];

        // Check if the user is an admin
        if (userTypeClaim === 'Admin') {
          return true;
        }
      } catch (error) {
        console.error('Token Decoding Error:', error);
      }
    }

    // If not authenticated or not an admin, redirect to a different route (e.g., login)
    this.router.navigate(['/login']); // Change this route as needed
    return false;
  }
}
