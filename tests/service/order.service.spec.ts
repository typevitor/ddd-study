import { Order } from "../../src/domain/entity/order";
import { OrderItem } from "../../src/domain/entity/order_item";
import { OrderService } from "../../src/domain/service/order.service";
import { Customer } from "../../src/domain/entity/customer";

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

  it('should throw error when placing an order with no items', () => {
    const customer = new Customer('c1', 'Customer 1', 'e1', 'p1');
    expect(() => OrderService.placeOrder(customer, [])).toThrow('Order must have at least one item');
  });

  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1', 'e1', 'p1');
    const item1 = new OrderItem('1', 'Product 1', 1, 200);
    const item2 = new OrderItem('2', 'Product 2', 2, 30);
    const order = OrderService.placeOrder(customer, [item1, item2]);
    expect(customer.rewardPoints).toBe(130);
    expect(order.calculateTotal()).toBe(260);
  });

});