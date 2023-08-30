import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
import { JwtService } from 'src/app/services/jwt.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

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
    console.log('Token:', token); // Log the token here
  
    if (token) {
      try {
        const decodedToken = this.jwtService.decodeToken(token);
        console.log('Decoded Token:', decodedToken); // Log the decoded token here
        this.FirstName = decodedToken.FirstName || '';
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
}
