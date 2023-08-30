import { Component, OnInit } from '@angular/core';
import { AdminProduct, ProductCategory } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  currentPage = 1; 
  itemsPerPage = 5; 
  totalPages = 5;
  displayedProducts: AdminProduct[] = [];
  searchTerm: string = '';
  categories: string[] = [
    'All Categories',
    'Appliances',
    'Clothing',
    'Electronics',
    'Toys'
  ];

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {}

  applyCategoryFilter(category: string): void {
    if (category === 'All Categories') {
      this._adminService.getAdminProducts().subscribe((response: AdminProduct[]) => {
        this.updateDisplayedProducts(response);
      });
    } else {
      this._adminService.getAdminProductsByCategory(category).subscribe((response: AdminProduct[]) => {
        this.updateDisplayedProducts(response);
      });
    }
  }

  updateDisplayedProducts(products?: AdminProduct[]): void {
    if (!products) {
      // Fetch products from service if not provided
      this._adminService.getAdminProducts().subscribe((response: AdminProduct[]) => {
        this.updateDisplayedProducts(response);
      });
      return;
    }

    // Calculate start and end indexes for pagination
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, products.length);

    // Extract subset of products to display
    this.displayedProducts = products.slice(startIndex, endIndex);
  }

  searchProducts(): void {
    if (this.searchTerm.trim() === '') {
      return; // If search term is empty, don't perform search
    }

    this._adminService.searchAdminProducts(this.searchTerm.toLowerCase()).subscribe((response: AdminProduct[]) => {
      this.updateDisplayedProducts(response);
    });
  }
}

