export interface Payment {
  paymentId: number;
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  cvv: string;
  orderId: number;
}
