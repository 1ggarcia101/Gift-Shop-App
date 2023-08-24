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

  cardData = [
    {
      imageUrl: 'assets/images/Isolated_white_t-shirt_front.jpg',
      title: 'Card title 1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas aliquet.'
    },
    {
      imageUrl: 'assets/images/12128.jpg',
      title: 'Card title 2',
      text: 'This is card content 2.'
    },
    {
      imageUrl: 'assets/images/81J4TvhJx1L.jpg',
      title: 'Card title 3',
      text: 'This is card content 3.'
    }
  ];

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    this._adminService.getAdminProducts().subscribe(
      (response: any) => {
        if (response && response.items) {
          this.products = response.items; // Assign the array of products
        }
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }
}
