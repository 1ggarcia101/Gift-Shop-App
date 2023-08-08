// import { Injectable } from '@angular/core';
// import { GiftShopUser } from '../models/giftShopUser';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from 'src/environments/environment.development';

// @Injectable({
//   providedIn: 'root'
// })
// export class UserSignupService {

//   private url = environment.apiURL;

//   signupObj: any = {
//     Id: 0,
//     FirstName: '',
//     LastName: '',
//     Email: '',
//     Password: ''
//   }

//   constructor(private http: HttpClient) { }

//   addUser(user:GiftShopUser): Observable<any> {
//     const headers = { 'content-type': 'application/json'}  
//     const body=JSON.stringify(user);
//     console.log(body)
//     return this.http.post(this.url + 'people', body,{'headers':headers})
//   }
// }
