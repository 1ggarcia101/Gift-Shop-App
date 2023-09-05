import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private jwtHelper: JwtHelperService) {}

  isTokenExpired(token: string): boolean {
    return this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
}

