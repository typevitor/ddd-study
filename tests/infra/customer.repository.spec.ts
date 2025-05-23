import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../src/infra/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../src/infra/customer/repository/sequelize/customer.repository";
import { Customer } from "../../src/domain/customer/entity/customer";
import { Address } from "../../src/domain/customer/value-object/address";

describe('CustomerRepositoryTest', () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      models: [__dirname + '/../../src/infra/db/sequelize/model'],
    });
    
    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should be able to create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findByPk('a-b-c');
    expect(customerModel).toBeDefined();
    expect(customerModel?.toJSON()).toStrictEqual({
      id: 'a-b-c',
      name: 'Customer 1',
      email: 'email@test.com',
      phone: '123456789',
      active: false,
      street: null,
      city: null,
      state: null,
      zipCode: null,
      rewardPoints: 0
    });
  });

  it('should create a customer with address', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    const customerModel = await CustomerModel.findByPk('a-b-c');
    expect(customerModel).toBeDefined();
    expect(customerModel?.toJSON()).toStrictEqual({
      id: 'a-b-c',
      name: 'Customer 1',
      email: 'email@test.com',
      phone: '123456789',
      active: false,
      street: 'Street 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '1233-33',
      rewardPoints: 0
    });
  });

  it('should be able to find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    
    const foundCustomer = await customerRepository.find('a-b-c');
    const customerModel = await CustomerModel.findByPk('a-b-c');
    
    expect(foundCustomer).toBeDefined();
    expect(foundCustomer?.getId()).toBe(customerModel?.id);
    expect(foundCustomer?.getName()).toBe(customerModel?.name);
    expect(foundCustomer?.getEmail()).toBe(customerModel?.email);
    expect(foundCustomer?.getPhone()).toBe(customerModel?.phone);
    expect(foundCustomer?.isActive()).toBe(customerModel?.active);
    expect(foundCustomer?.getAddress()?.getStreet()).toEqual(customerModel?.street);
    expect(foundCustomer?.getAddress()?.getCity()).toEqual(customerModel?.city);
    expect(foundCustomer?.getAddress()?.getState()).toEqual(customerModel?.state);
    expect(foundCustomer?.getAddress()?.getZipCode()).toEqual(customerModel?.zipCode);
  });

  it('should activate a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);

    expect(customer.isActive()).toBe(false);

    customer.activate();
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findByPk('a-b-c');
    expect(customerModel).toBeDefined();
    expect(customerModel?.active).toBe(true);
  });

  it('should be able to change Address', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findByPk('a-b-c');
    expect(customerModel).toBeDefined();
    expect(customerModel?.toJSON()).toStrictEqual({
      id: 'a-b-c',
      name: 'Customer 1',
      email: 'email@test.com',
      phone: '123456789',
      active: false,
      street: 'Street 1',
      city: 'City 1',
      state: 'State 1',
      zipCode: '1233-33',
      rewardPoints: 0
    });

    customer.changeAddress(new Address('Street 2', 'City 2', 'State 2', '1234-44'));
    await customerRepository.update(customer);
    const updatedCustomerModel = await CustomerModel.findByPk('a-b-c');
    expect(updatedCustomerModel).toBeDefined();
    expect(updatedCustomerModel?.toJSON()).toStrictEqual({
      id: 'a-b-c',
      name: 'Customer 1',
      email: 'email@test.com',
      phone: '123456789',
      active: false,
      street: 'Street 2',
      city: 'City 2',
      state: 'State 2',
      zipCode: '1234-44',
      rewardPoints: 0
    });
  });

  it('should throw an error when customer not found', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    
    expect(async () => {
      await customerRepository.find('non-existing-id');
    }).rejects.toThrow('Customer not found');
  });

  it('should be able to find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);

    const customer2 = new Customer('c-d-e', 'Customer 2', 'email2@t.com', '987654321');
    customer2.changeAddress(new Address('Street 2', 'City 2', 'State 2', '1234-44'));
    await customerRepository.create(customer2);
    customer2.activate();
    await customerRepository.update(customer2);

    const lCustomers = [customer, customer2];
    const customers = await customerRepository.findAll();
    expect(customers).toBeDefined();
    expect(customers.length).toBe(2);
    expect(lCustomers).toEqual(customers);
  });

  it('should be able to increase reward points', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    await customerRepository.create(customer);
    customer.addRewardPoints(10);
    await customerRepository.update(customer);
    const customerModel = await CustomerModel.findByPk('a-b-c');
    expect(customerModel).toBeDefined();
    expect(customerModel?.rewardPoints).toBe(10);
  });
});