import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { AdminProduct } from '../models/adminProducts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { catchError } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AdminService implements OnInit{

  private url = environment.apiURL
  private _login = "/Products/get"
  private _post = "/Products/post"

  constructor(
    private http: HttpClient, 
    private modalService: NgbModal
    ) { }

    productObj : AdminProduct = {
      productId: '',
      productName: '',
      productDescription: '',
      productImage: '',
      productCategory: 0,
      productPrice: 0,
      productQuantity: 0
    }

    ngOnInit(): void {
  
    }

  getAdminProducts(): Observable<any> {
    return this.http.get(this.url + this._login)
  }

  onSubmit(f: NgForm) {

    const formData = {
      productName: this.productObj.productName,
      productDescription: this.productObj.productDescription,
      productImage: this.productObj.productImage,
      productPrice: this.productObj.productPrice,
      productCategory: this.productObj.productCategory
    }

    this.http.post(this.url + this._post, formData)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
        console.log(result)
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

}
