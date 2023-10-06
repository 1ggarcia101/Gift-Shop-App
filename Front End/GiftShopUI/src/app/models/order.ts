export interface Order {
  OrderId: number;
  CustomerId: number;
  TotalAmount: number;
  OrderItems: any[];
  OrderDate: Date;
}

export interface OrderItem {
  productId: number;
  productName: string;
  productImage: string;
  productPrice: number;
  productQuantity: number;
}
