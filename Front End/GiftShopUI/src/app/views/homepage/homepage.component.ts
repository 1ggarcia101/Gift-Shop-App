import { Component, OnInit } from '@angular/core';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products: AdminProduct[] = []; 
  displayedProducts: AdminProduct[] = []; 
  selectedCategory: ProductCategory | null = null; 
  searchQuery: string = '';
  currentPage = 1; 
  itemsPerPage = 8; 
  totalPages = 5;

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this._adminService.getAdminProducts().subscribe(
      (response: any) => {
        console.log(response);
        if (response) {
          this.products = response;
          this.updateDisplayedProducts(); // Assign the array of products
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  updateDisplayedProducts() {
    // Filter products based on selected category and search query
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    let filteredProducts = this.products;

    if (endIndex <= this.products.length) {
      this.displayedProducts = this.products.slice(startIndex, endIndex);
    } else {
      // If endIndex exceeds array length, display remaining items
      this.displayedProducts = this.products.slice(startIndex);
    }

    if (this.selectedCategory !== null) {
      filteredProducts = filteredProducts.filter(product => product.productCategory === this.selectedCategory);
    }

    if (this.searchQuery !== '') {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product =>
        product.productName && product.productName.toLowerCase().includes(lowerCaseQuery)
      );
    }
    

    // Update displayed products based on pagination
    this.displayedProducts = filteredProducts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateDisplayedProducts(); 
    }
  }

  onCategoryChange(category: ProductCategory): void {
    this.selectedCategory = category;
    this.updateDisplayedProducts();
  }

  onSearch(): void {
    this.updateDisplayedProducts();
  }
}
