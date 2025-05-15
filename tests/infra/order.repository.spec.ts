import { Sequelize } from "sequelize-typescript";

import OrderModel from "../../src/infra/db/sequelize/model/order.model";
import OrderItemModel from "../../src/infra/db/sequelize/model/order_item.model";
import CustomerModel from "../../src/infra/db/sequelize/model/customer.model";
import ProductModel from "../../src/infra/db/sequelize/model/product.model";

import CustomerRepository from "../../src/infra/repository/customer.repository";
import ProductRepository from "../../src/infra/repository/product.repository";
import OrderRepository from "../../src/infra/repository/order.repository";

import { Customer } from "../../src/domain/entity/customer";
import { Address } from "../../src/domain/entity/address";
import { Product } from '../../src/domain/entity/product';
import { OrderItem } from "../../src/domain/entity/order_item";
import { OrderService } from "../../src/domain/service/order.service";

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
    const product2 = new Product('p-2', 'Product 2', 150);
    await productRepository.create(product2);

    const orderRepository = new OrderRepository();
    const order = OrderService.placeOrder(customer, [
      new OrderItem('oi-1', product.getId(), 2, product.getPrice()),
      new OrderItem('oi-2', product2.getId(), 1, product2.getPrice())
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
      total: 350,
      items: [
        {
          id: 'oi-1',
          order_id: order.getId(),
          product_id: 'p-1',
          quantity: 2,
          price: 100,
        },
        {
          id: 'oi-2',
          order_id: order.getId(),
          product_id: 'p-2',
          quantity: 1,
          price: 150,
        }
      ]
    });
  });	

  it('should be able to find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    
    const productRepository = new ProductRepository();
    const product = new Product('p-1', 'Product 1', 100);
    await productRepository.create(product);
    const product2 = new Product('p-2', 'Product 2', 150);
    await productRepository.create(product2);

    const orderRepository = new OrderRepository();
    const order = OrderService.placeOrder(customer, [
      new OrderItem('oi-1', product.getId(), 2, product.getPrice()),
      new OrderItem('oi-2', product2.getId(), 1, product2.getPrice())
    ]);
    await orderRepository.create(order);
    
    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ['items']
    });

    const orderFound = await orderRepository.find(order.getId());

    expect(orderModel).toBeDefined();
    expect(orderModel?.toJSON()).toStrictEqual({
      id: orderFound?.getId(),
      customer_id: orderFound?.getCustomerId(),
      order_date: orderFound?.getOrderDate(),
      total: orderFound?.calculateTotal(),
      items: [
        {
          id: 'oi-1',
          order_id: orderFound?.getId(),
          product_id: 'p-1',
          quantity: 2,
          price: 100,
        },
        {
          id: 'oi-2',
          order_id: order.getId(),
          product_id: 'p-2',
          quantity: 1,
          price: 150,
        }
      ]
    });
  });

  it('should be able to find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('p-1', 'Product 1', 100);
    await productRepository.create(product);
    const product2 = new Product('p-2', 'Product 2', 150);
    await productRepository.create(product2);
    const orderRepository = new OrderRepository();
    const order = OrderService.placeOrder(customer, [
      new OrderItem('oi-1', product.getId(), 2, product.getPrice()),
      new OrderItem('oi-2', product2.getId(), 1, product2.getPrice())
    ]);
    await orderRepository.create(order);

    const order2 = OrderService.placeOrder(customer, [
      new OrderItem('oi-3', product.getId(), 1, product.getPrice()),
    ]);

    await orderRepository.create(order2);
    const orders = await orderRepository.findAll();

    const orderModel = await OrderModel.findAll({
      include: ['items']
    });

    expect(orders).toHaveLength(2);

    expect(orderModel[0]?.toJSON()).toStrictEqual({
      id: order.getId(),
      customer_id: order.getCustomerId(),
      order_date: order.getOrderDate(),
      total: order.calculateTotal(),
      items: [
        {
          id: 'oi-1',
          order_id: order.getId(),
          product_id: 'p-1',
          quantity: 2,
          price: 100,
        },
        {
          id: 'oi-2',
          order_id: order.getId(),
          product_id: 'p-2',
          quantity: 1,
          price: 150,
        }
      ]
    });
    expect(orderModel[1]?.toJSON()).toStrictEqual({
      id: order2.getId(),
      customer_id: order2.getCustomerId(),
      order_date: order2.getOrderDate(),
      total: order2.calculateTotal(),
      items: [
        {
          id: 'oi-3',
          order_id: order2.getId(),
          product_id: 'p-1',
          quantity: 1,
          price: 100,
        }
      ]
    });
  });

  it('should be able to update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');

    await customerRepository.create(customer);
    const productRepository = new ProductRepository();
    const product = new Product('p-1', 'Product 1', 100);
    await productRepository.create(product);
    const product2 = new Product('p-2', 'Product 2', 150);
    await productRepository.create(product2);
    const orderRepository = new OrderRepository();
    const order = OrderService.placeOrder(customer, [
      new OrderItem('oi-1', product.getId(), 2, product.getPrice()),
    ]);
    await orderRepository.create(order);

    const orderFound = await orderRepository.find(order.getId());
    orderFound?.addItem(new OrderItem('oi-2', product2.getId(), 1, product2.getPrice()));
    await orderRepository.update(orderFound!);

    const orderModel = await OrderModel.findOne({
      where: { id: order.getId() },
      include: ['items']
    });
    expect(orderModel).toBeDefined();
    expect(orderModel?.items).toHaveLength(2);
    expect(orderModel?.toJSON()).toStrictEqual({
      id: orderFound?.getId(),
      customer_id: orderFound?.getCustomerId(),
      order_date: orderFound?.getOrderDate(),
      total: 350,
      items: [
        {
          id: 'oi-1',
          order_id: orderFound?.getId(),
          product_id: 'p-1',
          quantity: 2,
          price: 100,
        },
        {
          id: 'oi-2',
          order_id: orderFound?.getId(),
          product_id: 'p-2',
          quantity: 1,
          price: 150,
        }
      ]
    });
  });
});