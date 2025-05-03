import { Order } from "../entities/order";

export class OrderService {

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.calculateTotal();
    }, 0);
  }
}