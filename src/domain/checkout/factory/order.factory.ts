import { Order } from "../entity/order";
import { OrderItem } from "../entity/order_item";

interface OrderProps {
  id: string;
  customerId: string;
  orderDate: Date;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
}

export default class OrderFactory {

  public static create(orderProps: OrderProps): Order {
    const items = orderProps.items.map(item =>
      new OrderItem(
        item.id,
        item.productId,
        item.quantity,
        item.price
      )
    );
    
    const order = new Order(
      orderProps.id,
      orderProps.customerId,
      orderProps.orderDate,
      items
    );
    return order;
  }
}