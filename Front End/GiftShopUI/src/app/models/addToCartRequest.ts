import { CartItem } from './cartItem';

export class AddToCartRequest {
  constructor(public userId: number, public cartItems: CartItem[]) {}
}
