import { Component, Output, EventEmitter, Input, SimpleChanges, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Input() product: AdminProduct = {};

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
        ProductName: [''],
        ProductDescription: [''],
        ProductImage: [''],
        ProductPrice: [0],
        ProductCategory: [ProductCategory.Appliances],
        ProductQuantity: [0]
    });
  }

  onEdit() {
    if (!this.productForm.valid) {
      console.log(this.productForm.errors);
      return;
    }
  
    const editedProductData = this.productForm.value;
    this._adminService.editAdminProduct(editedProductData).subscribe(
      res => {
        console.log(res);
        this.modalService.dismissAll(); // Dismiss the modal
  
        // Update the products array with the edited product
        const editedProductIndex = this.products.findIndex(product => product.productId === editedProductData.productId);
        if (editedProductIndex !== -1) {
          this.products[editedProductIndex] = editedProductData;
        }
      },
      // Handle errors if needed
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.product && this.product) {
      this.productForm.patchValue({
        ProductName: this.product.ProductName,
        ProductDescription: this.product.ProductDescription,
        ProductImage: this.product.ProductImage,
        ProductPrice: this.product.ProductPrice,
        ProductCategory: this.product.ProductCategory,
        ProductQuantity: this.product.ProductQuantity
      });
    }
  }

}
