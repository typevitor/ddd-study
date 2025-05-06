import { Order } from "./entities/order";

const customer = new Customer(
  '1',
  'John Doe',
  'email@test.com',
  '1234567890',
);
customer.addAddress(
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