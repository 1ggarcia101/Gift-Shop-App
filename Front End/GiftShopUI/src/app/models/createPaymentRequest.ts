export interface CreatePaymentRequest {
  cardNumber: string;
  nameOnCard: string;
  expirationDate: string;
  cvv: string;
  orderId: number;

}
