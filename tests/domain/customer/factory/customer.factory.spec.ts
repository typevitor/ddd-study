import CustomerFactory from '../../../../src/domain/customer/factory/customer.factory';
import { Address } from '../../../../src/domain/customer/value-object/address';

describe('CustomerFactoryUnitTest', () => {

  it('should create a customer with valid data', () => {
    const customerData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      phone: '123-456-7890',
    };

    const customer = CustomerFactory.create(customerData);
    expect(customer.getName()).toBe(customerData.name);
    expect(customer.getEmail()).toBe(customerData.email);
    expect(customer.getAddress()).toBeNull();
    expect(customer.constructor.name).toBe('Customer');
  });

  it('should create a customer with address', () => {
    const customerData = {
      name: 'John Doe',
      email: 'johndoe@email.com',
      phone: '123-456-7890',
    };
    const address = new Address(
      '123 Main St',
      'Anytown',
      'CA',
      '12345'
    );
    const customer = CustomerFactory.createWithAddress(customerData, address);
    expect(customer.getName()).toBe(customerData.name);
    expect(customer.getEmail()).toBe(customerData.email);
    expect(customer.getAddress()).toBeDefined();
    expect(customer.getAddress()?.toString()).toBe('123 Main St, Anytown, CA 12345');
    expect(customer.getAddress()?.getStreet()).toBe('123 Main St');
    expect(customer.getAddress()?.getCity()).toBe('Anytown');
    expect(customer.getAddress()?.getState()).toBe('CA');
    expect(customer.constructor.name).toBe('Customer');
  });
});