import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  private url = environment.apiURL;
  private _userDetails = '/GiftShopUsers/user-details';

  constructor(private http: HttpClient, private jwtService: JwtService) {}

  getUserDetails(): Observable<any> {
    return this.http.get(this.url + this._userDetails);
  }

  getFirstNameFromToken(token: string): string {
    const decodedToken = this.jwtService.decodeToken(token);
    return decodedToken.FirstName;
  }
}
