import { v4 as uuid } from 'uuid';
import OrderFactory from '../../../../src/domain/checkout/factory/order.factory';

describe('OrderFactory', () => {

  it('should create an order with the correct properties', () => {
    const orderProps = {
      id: uuid(),
      customerId: uuid(),
      orderDate: new Date(),
      items: [
        { id: uuid(), productId: uuid(), quantity: 2, price: 19.99 },
        { id: uuid(), productId: uuid(), quantity: 1, price: 29.99 }
      ],
      totalAmount: 69.97
    }

    const order = OrderFactory.create(orderProps);
    expect(order.getId()).toBe(orderProps.id);
    expect(order.getCustomerId()).toBe(orderProps.customerId);
    expect(order.getItems()).toHaveLength(2);
  });

});