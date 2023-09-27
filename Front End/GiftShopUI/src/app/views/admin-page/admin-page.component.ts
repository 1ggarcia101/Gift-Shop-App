import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent {
  @Input() product: AdminProduct = {};

  productForm: FormGroup;
  closeResult: string = '';
  products: any[] = [];
  selectedProduct: AdminProduct | null = {};
  categoryList: number[] = [
    ProductCategory.Appliances,
    ProductCategory.Clothing,
    ProductCategory.Electronics,
    ProductCategory.Toys,
  ];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 5;
  totalProducts: number = 0;
  displayedProducts: AdminProduct[] = [];
  unauthorizedAccess = false;
  submitted: boolean = false;

  constructor(
    private router: Router,
    protected _adminService: AdminService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _editModal: ModalComponent
  ) {
    this.productForm = this.formBuilder.group({
      ProductName: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(1),
          this.noWhitespaceValidator,
        ],
      ],
      ProductDescription: [
        '',
        [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(1),
          this.noWhitespaceValidator,
        ],
      ],
      ProductImage: ['', [Validators.required]],
      ProductPrice: [0, [Validators.required, this.excludeCharacter('e')]],
      ProductCategory: [ProductCategory.Appliances],
      ProductQuantity: [0, [Validators.required, this.excludeCharacter('e')]],
    });
  }

  navigateToHomepage() {
    this.router.navigate(['app-homepage']);
  }

  navigateToSingleProductPage(productId: number | undefined) {
    if (productId !== undefined) {
      this.router.navigate(['/app-single-product-page', productId]);
    }
  }

  ngOnInit(): void {
    this.fetchProductsAndCount();
  }

  open(
    content: any,
    isEditing: boolean = false,
    product: AdminProduct | null = null
  ) {
    if (isEditing) {
      this.selectedProduct = product;
      this.productForm.patchValue({
        ProductName: product?.productName || '',
        ProductDescription: product?.productDescription || '',
        ProductImage: product?.productImage || '',
        ProductPrice: product?.productPrice || 0,
        ProductCategory: product?.productCategory || ProductCategory.Appliances,
        ProductQuantity: product?.productQuantity || 0,
      });
    }

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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
    this.submitted = true;
    if (!this.productForm.valid) {
      return;
    }

    const productData = this.productForm.value;
    productData.ProductCategory = Number(productData.ProductCategory);

    this._adminService.submitNewProduct(productData).subscribe(
      (res) => {
        console.log(res);
        this.products.push(res);
        this.modalService.dismissAll();
        this.submitted = false;
        this.updateDisplayedProducts();
      },
      (error) => {
        console.error('Error submitting product:', error);
      }
    );

    location.reload();
  }

  onEdit() {
    if (!this.productForm.valid) {
      return;
    }

    const editedProductData = this.productForm.value;
    editedProductData.productId = this.selectedProduct?.productId;
    editedProductData.ProductCategory = Number(
      editedProductData.ProductCategory
    );

    this._adminService.editAdminProduct(editedProductData).subscribe(
      (res) => {
        console.log(res);
        this.modalService.dismissAll();
        const editedProductIndex = this.products.findIndex(
          (product) => product.productId === editedProductData.productId
        );
        if (editedProductIndex !== -1) {
          this.products[editedProductIndex] = editedProductData;
        }
      },
      (error) => {
        console.error('Error editing product:', error);
      }
    );

    location.reload();
  }

  fetchProductsAndCount() {
    this._adminService.getAdminProductsAndCount().subscribe(
      (response: any) => {
        if (response) {
          this.products = response.products;
          this.totalProducts = response.totalProducts; // Store the total product count
          this.updateDisplayedProducts();
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  showDeleteConfirmation(productId: number | any): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    );
    if (confirmed) {
      // If the user confirms, delete the product
      this.deleteProducts(productId);
    }
  }

  deleteProducts(productId: number | any) {
    this._adminService.deleteAdminProduct(productId).subscribe(
      (res) => {
        console.log(res);
        this.products = this.products.filter(
          (product) => product.id !== productId
        );
        location.reload();
      },
      (error) => {
        console.error('Error deleting product', error);
      }
    );
  }

  updateDisplayedProducts() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (endIndex <= this.totalProducts) {
      this.displayedProducts = this.products.slice(startIndex, endIndex);
    } else {
      this.displayedProducts = this.products.slice(startIndex);
    }

    // Calculate the total number of pages dynamically
    this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateDisplayedProducts();
    }
  }

  excludeCharacter(excludedChar: string) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (typeof control.value !== 'string') {
        return null; // If the control value is not a string, no validation needed
      }

      const forbidden = control.value.includes(excludedChar);
      return forbidden ? { excludeCharacter: { value: control.value } } : null;
    };
  }

  noWhitespaceValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const isWhitespace = (control.value || '').trim().length === 0;
    return isWhitespace ? { whitespace: true } : null;
  }
}
