export interface Order {
    OrderId: number;       
    CustomerId: number;    
    TotalAmount: number;   
    OrderItems: OrderItem[]; 
    OrderDate: Date;       
  }

export interface OrderItem {
    productId: number;
    name: string;       
    image: string;           
    price: number;       
    quantity: number;
}
  