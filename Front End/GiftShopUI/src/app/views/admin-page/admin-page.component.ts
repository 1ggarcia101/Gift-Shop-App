import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  productForm: FormGroup;
  closeResult: string = "";
  products: any[] = [];
  categoryList: number[] = [
    ProductCategory.Appliances,
    ProductCategory.Clothing,
    ProductCategory.Electronics,
    ProductCategory.Toys
  ]

  constructor (
    private router: Router,
    protected _adminService: AdminService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    
    ){
      this.productForm = this.formBuilder.group({
        ProductName: ['', Validators.required],
        ProductDescription: [''],
        ProductImage: [''],
        ProductPrice: [null],
        ProductCategory: [ProductCategory.Appliances],
        ProductQuantity: [0]
    });
  }

  navigateToHomepage(){
    this.router.navigate(['app-homepage']);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  // public getProductCardInfo(){
  //   this._adminService.getAdminProducts().subscribe(
  //     (product: AdminProduct) => {
  //       this.productObj = product;
  //     },
  //     error => {
  //       console.error('Error fetching product:', error);
  //     }
  // )}

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

  public onSubmit() {

    // validations
    if (!this.productForm.valid) {
      console.log(this.productForm.errors)
      return
    }

    // Get the form values using this.productForm.value
    const productData = this.productForm.value;
    console.log(productData)
    this._adminService.submitNewProduct(productData).subscribe(
      res => {
        console.log(res);
        this.modalService.dismissAll(); //dismiss the modal
      },
    );
  }

  fetchProducts() {
    this._adminService.getAdminProducts().subscribe(
      (products: AdminProduct[]) => {
        this.products = products;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProducts(){
    this._adminService.deleteAdminProduct().subscribe(
      (res) => {
        this.ngOnInit
      },
      error => {
        console.error("Error deleting product", error);
      }
    );
  }

  
}
