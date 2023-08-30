import { Component, OnInit } from '@angular/core';
import { AdminProduct } from 'src/app/models/adminProducts';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  products: AdminProduct[] = []; // Array to store product data

  constructor(private _adminService: AdminService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this._adminService.getAdminProducts().subscribe(
      (response: any) => {
        console.log(response);
        console.log(response.items);
        if (response) {
          this.products = response; // Assign the array of products
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
