import { Order } from "../../src/entities/order";
import { OrderItem } from "../../src/entities/order_item";
import { OrderService } from "../../src/service/order.service";

describe('OrderServiceUnitTest', () => {

  it('should get total of all orders', () => {
    const item1 = new OrderItem('1', 'Product 1', 1, 200);
    const item2 = new OrderItem('2', 'Product 2', 2, 30);
    const order1 = new Order('o1', 'c1', new Date(), [item1, item2]);

    const item4 = new OrderItem('4', 'Product 4', 2, 50);
    const order2 = new Order('o2', 'c2', new Date(), [item4]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(360);
  });

});