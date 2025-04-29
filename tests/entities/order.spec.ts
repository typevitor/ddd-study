import { Order } from '../../src/entities/order';
import { OrderItem } from '../../src/entities/order_item';

describe('OrderUnitTest', () => {

  it('should throw error if create an order with invalid ID', () => {
    expect(() => {
      new Order('', '123', new Date(), []);
    }).toThrow('ID is required');
  });

  it('should throw error if create an order with invalid product', () => {
    expect(() => {
      new Order('1', '', new Date(), []);
    }).toThrow('Customer ID is required');
  });

  it('should throw error if items quantity is zero', () => {
    expect(() => {
      new Order('1', '123', new Date(), []);
    }).toThrow('Items are required');
  });

  it('should calculate total', () => {
    const order = new Order('1', '123', new Date(), [
      new OrderItem('1', 'Item 1', 100, 2),
      new OrderItem('2', 'Item 2', 50, 1),
    ]);
    expect(order.calculateTotal()).toBe(250);

    const order2 = new Order('2', '123', new Date(), [
      new OrderItem('1', 'Item 1', 70, 2),
      new OrderItem('2', 'Item 2', 33, 1),
    ]);
    expect(order2.calculateTotal()).toBe(173);
  });

  it('should add an item to the order', () => {
    const order = new Order('1', '123', new Date(), [
      new OrderItem('1', 'Item 1', 100, 2),
    ]);
    order.addItem(new OrderItem('2', 'Item 2', 50, 1));
    expect(order.calculateTotal()).toBe(250);
  });
});