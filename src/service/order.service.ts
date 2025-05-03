import { Customer } from "../entities/customer";
import { Order } from "../entities/order";
import { OrderItem } from "../entities/order_item";
import { v4 as uuid } from 'uuid';

export class OrderService {

  static total(orders: Order[]): number {
    return orders.reduce((acc, order) => {
      return acc + order.calculateTotal();
    }, 0);
  }

  static placeOrder(customer: Customer, items: OrderItem[]): Order {
    if (items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    const order = new Order(uuid(), customer.getId(), new Date(), items);
    customer.addRewardPoints(Math.floor(order.calculateTotal() / 2));
    return order;
  }
}