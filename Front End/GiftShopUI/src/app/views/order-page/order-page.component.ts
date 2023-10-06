import { Component } from '@angular/core';
import { Order } from 'src/app/models/order';
import { OrderService } from 'src/app/services/order.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss'],
})
export class OrderPageComponent {
  orders: any = [];
  orderId: number = 0; 
  userId: number = 0;   
  totalAmount: number = 0;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
    ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserId();

    this.fetchOrders();
  }

  fetchOrders() {
    // this.orderService.getOrders(this.orderId).then(data => {
    //   this.orders = data;
    //   console.log(this.orders)
    // })
    this.orderService.getOrdersByUserId(this.userId).subscribe(
      (orders) => {
        this.orders = orders;
        console.log(this.orders)
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}
