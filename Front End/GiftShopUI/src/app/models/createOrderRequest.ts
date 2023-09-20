import { OrderItem } from './orderItem'; // Import the OrderItem class if you have it defined

export class CreateOrderRequest {
  constructor(
    public userId: number,
    public orderItems: OrderItem[]
  ) // Add other order-related properties here if needed
  {}
}
