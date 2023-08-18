import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor (
    private router: Router,
    protected _adminService: AdminService,
    private modalService: NgbModal,
    private http: HttpClient, 
    ){}

  productObj : AdminProduct = {
    productId: '',
    productName: '',
    productDescription: '',
    productImage: '',
    productCategory: 0,
    productPrice: 0,
    productQuantity: 0
  }

  private url = environment.apiURL
  private _login = "/Products/post"

  closeResult: string = "";
  products: AdminProduct[] = [];

  navigateToHomepage(){
    this.router.navigate(['app-homepage']);
  }

  ngOnInit(): void {
  
  }

  public getProductCardInfo(){
    this._adminService.getAdminProducts().subscribe(
      (product: AdminProduct) => {
        this.productObj = product;
      },
      error => {
        console.error('Error fetching product:', error);
      }
  )}

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(f: NgForm) {

    const formData = {
      productName: this.productObj.productName,
      productDescription: this.productObj.productDescription,
      productImage: this.productObj.productImage,
      productPrice: this.productObj.productPrice,
      productCategory: this.productObj.productCategory
    }

    this.http.post(this.url + this._login, formData)
      .subscribe((result) => {
        this.ngOnInit(); //reload the table
        console.log(result)
      });
    this.modalService.dismissAll(); //dismiss the modal
  }

}
