import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminProduct } from 'src/app/models/adminProducts';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  productObj : AdminProduct = {
    productId: '',
    productName: '',
    productDescription: '',
    productImage: '',
    productCategory: 0,
    productPrice: 0,
    productQuantity: 0
  }

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: [''],
      productPrice: ['', Validators.required],
      // ... other form controls
    });
  }

  submitForm() {
    if (this.productForm.valid) {
      // Emit the new product data to the parent component
      // For example, you might emit an event or use a service
      // Then close the modal
    }
  }
}
