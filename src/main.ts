import { Address } from './domain/customer/value-object/address';
import { Customer } from './domain/customer/entity/customer';
import { Order } from './domain/checkout/entity/order';
import { OrderItem } from './domain/checkout/entity/order_item';

const customer = new Customer(
  '1',
  'John Doe',
  'email@test.com',
  '1234567890',
);
customer.changeAddress(
  new Address(
    '123 Main St',
    'Anytown',
    'CA',
    '12345'
  )
);

customer.activate();

const order = new Order(
  '1',
  customer.getId().toString(),
  new Date(),
  []
);

order.addItem(new OrderItem('1', 'Product 1', 2, 19.99));