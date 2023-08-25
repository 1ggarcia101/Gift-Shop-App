import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { PaginationComponent } from 'src/app/components/pagination/pagination.component';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  @Input() product: AdminProduct = {};

  productForm: FormGroup;
  closeResult: string = "";
  products: any[] = [];
  selectedProduct: AdminProduct | null = {};
  categoryList: number[] = [
    ProductCategory.Appliances,
    ProductCategory.Clothing,
    ProductCategory.Electronics,
    ProductCategory.Toys
  ]
  currentPage = 1; 
  itemsPerPage = 5; 
  totalPages = 5;
  displayedProducts: AdminProduct[] = []; 

  constructor (
    private router: Router,
    protected _adminService: AdminService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private _editModal: ModalComponent
    
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

  navigateToHomepage(){
    this.router.navigate(['app-homepage']);
  }

  ngOnInit(): void {
    this.fetchProducts();
  }

  open(content: any, isEditing: boolean = false, product: AdminProduct | null = null) {
    if (isEditing) {
      // Handle editing logic here, e.g., populate the form fields with the product data
      this.selectedProduct = product;
      this.productForm.patchValue({
        ProductName: product?.productName || '',
        ProductDescription: product?.productDescription || '',
        ProductImage: product?.productImage || '',
        ProductPrice: product?.productPrice || 0,
        ProductCategory: product?.productCategory || ProductCategory.Appliances,
        ProductQuantity: product?.productQuantity || 0
      });
    }
    
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
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

    // validations
    if (!this.productForm.valid) {
      console.log(this.productForm.errors)
      return
    }

    // Get the form values using this.productForm.value
    const productData = this.productForm.value;
    productData.ProductCategory = Number(productData.ProductCategory);
    console.log(productData)
    this._adminService.submitNewProduct(productData).subscribe(
      res => {
        console.log(res);
        this.products.push(res);
        this.modalService.dismissAll(); 
        location.reload();
      },
    );
  }

  onEdit() {
    if (!this.productForm.valid) {
      console.log(this.productForm.errors);
      return;
    }
  
    const editedProductData = this.productForm.value;
    editedProductData.productId = this.selectedProduct?.productId;
    editedProductData.ProductCategory = Number(editedProductData.ProductCategory);
    
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
    );

    location.reload();
  }

  fetchProducts() {
    this._adminService.getAdminProducts().subscribe(
      (response: any) => {
        if (response) {
          this.products = response; // Assign the items array to this.products
          this.updateDisplayedProducts(); // Update the displayed products after fetching
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  deleteProducts(productId: number | any){
    this._adminService.deleteAdminProduct(productId).subscribe(
      (res) => {
        console.log(res);
        this.products = this.products.filter(product => product.id !== productId);
        location.reload();
      },
      error => {
        console.error("Error deleting product", error);
      }
    );
  }

  updateDisplayedProducts() {
    // Using slice to create a new array with a subset of items
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (endIndex <= this.products.length) {
      this.displayedProducts = this.products.slice(startIndex, endIndex);
    } else {
      // If endIndex exceeds array length, display remaining items
      this.displayedProducts = this.products.slice(startIndex);
    }
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateDisplayedProducts(); 
    }
  }

  
}
