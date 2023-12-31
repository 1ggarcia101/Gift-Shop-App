import { Component, OnInit } from '@angular/core';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent implements OnInit {
  products: AdminProduct[] = [];
  displayedProducts: AdminProduct[] = [];
  selectedCategory: ProductCategory | null = null;
  productCategories: ProductCategory[] = [
    ...(Object.values(ProductCategory) as ProductCategory[]).filter(
      (value) => typeof value === 'number'
    ),
  ];
  searchQuery: string = '';
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 5;
  totalProducts: number = 0;

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProductsAndCount();
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

  updateDisplayedProducts(): void {
    // Filter products based on selected category and search query
    let filteredProducts = [...this.products];

    if (this.selectedCategory !== null && this.selectedCategory !== undefined) {
      filteredProducts = filteredProducts.filter(
        (product) => product.productCategory === this.selectedCategory
      );
    }

    if (this.searchQuery.trim() !== '') {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.productName &&
          product.productName.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Calculate the total number of pages dynamically
    this.totalPages = Math.ceil(this.totalProducts / this.itemsPerPage);

    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    // Update displayed products based on pagination
    this.displayedProducts = filteredProducts.slice(startIndex, endIndex);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updateDisplayedProducts();
    }
  }

  onCategoryChange(category: ProductCategory | null): void {
    this.selectedCategory = category;
    this.updateDisplayedProducts();
  }

  onSearch(): void {
    this.updateDisplayedProducts();
  }

  clearFilters(): void {
    this.selectedCategory = null;
    this.searchQuery = '';
    this.itemsPerPage = 8;
    this.updateDisplayedProducts();
  }
}
