import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isAuthenticated: boolean = false;
  FirstName: string = '';
  private authSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {
    this.authSubscription = this.authService.isAuthenticated$.subscribe(
      (isAuthenticated) => {
        this.isAuthenticated = isAuthenticated;
        if (isAuthenticated) {
          this.updateFirstName();
        }
      }
    );
  }

  ngOnInit(): void {
    this.updateFirstName();
  }

  updateFirstName() {
    const token = this.authService.getToken();

    if (token) {
      try {
        const decodedToken = this.jwtService.decodeToken(token);
        let claims =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];
        this.FirstName = claims[1];

        let userTypeClaim =
          decodedToken[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
          ];
      } catch (error) {
        console.error('Token Decoding Error:', error);
      }
    } else {
      this.FirstName = '';
    }
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
