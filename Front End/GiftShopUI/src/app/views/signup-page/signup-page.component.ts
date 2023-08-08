import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit{

  signupObj: any = {
    Id: 0,
    FirstName: '',
    LastName: '',
    Email: '',
    Password: ''
  }

  constructor (private router: Router, private http: HttpClient){}

  navigateToSignupPage(){
    this.router.navigate(['app-signup-page']);
  }

  ngOnInit(): void {
    
  }

  public onRegister(){
    this.http.post("http://localhost:7031/api/[controller]/register", this.signupObj).subscribe()
  }

}
