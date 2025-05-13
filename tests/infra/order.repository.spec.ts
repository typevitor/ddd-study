import { Sequelize } from "sequelize-typescript";

import OrderModel from "../../src/infra/db/sequelize/model/order.model";
import CustomerModel from "../../src/infra/db/sequelize/model/customer.model";
import ProductModel from "../../src/infra/db/sequelize/model/product.model";
import OrderItemModel from "../../src/infra/db/sequelize/model/order_item.model";

import CustomerRepository from "../../src/infra/repository/customer.repository";
import ProductRepository from "../../src/infra/repository/product.repository";
import OrderRepository from "../../src/infra/repository/order.repository";

import { Customer } from "../../src/domain/entity/customer";
import { Address } from "../../src/domain/entity/address";
import { Product } from '../../src/domain/entity/product';
import { OrderItem } from "../../src/domain/entity/order_item";
import { OrderService } from "../../src/service/order.service";

describe('OrderRepositoryTest', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [__dirname + '/../../src/infra/db/sequelize/model'],
    });
    
    sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product('p-1', 'Product 1', 100);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();
    const order = OrderService.placeOrder(customer, [
      new OrderItem('oi-1', product.getId(), 2, product.getPrice())
    ]);
    await orderRepository.create(order);
    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ['items']
    });

    expect(orderModel).toBeDefined();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.getId(),
      customer_id: customer.getId(),
      order_date: order.getOrderDate(),
      items: [
        {
          id: 'oi-1',
          order_id: order.getId(),
          product_id: 'p-1',
          quantity: 2,
          price: 100,
          total: 200
        }
      ]
    });
  });	
});