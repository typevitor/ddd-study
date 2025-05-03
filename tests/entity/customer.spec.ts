import { Address } from '../../src/domain/entity/address';
import { Customer } from '../../src/domain/entity/customer';

describe('CustomerUnitTests', () => {
  
  it('should not create a customer with invalid ID', () => {
    expect(() => {
      new Customer('', 'John Doe', 'email@test.com', '1234567890')
    }).toThrow('ID is required');
  });

  it('should not create a customer with invalid Name', () => {
    expect(() => {
      new Customer('1', '', 'email@test.com', '1234567890')
    }).toThrow('Name is required');
  });

  it('should not create a customer with invalid email', () => {
    expect(() => {
      new Customer('1', 'John Doe', '', '1234567890')
    }).toThrow('Email is required');
  });

  it('should not create a customer with invalid phone', () => {
    expect(() => {
      new Customer('1', 'John Doe', 'email@test.com', '')
    }).toThrow('Phone is required');
  });

  it('should create a customer with valid data', () => {
    const customer = new Customer('1', 'John Doe', 'email@test.com', '1234567890');
    expect(customer.getName()).toBe('John Doe');
    expect(customer.getEmail()).toBe('email@test.com');
    expect(customer.getPhone()).toBe('1234567890');
    expect(customer.isActive()).toBe(false);
  });

  it('should not activate a customer without address', () => {
    const customer = new Customer('1', 'John Doe', 'email@test.com', '1234567890');
    expect(() => {
      customer.activate();
    }).toThrow('Address is required to activate the customer');
  });

  it('should activate a customer with address', () => {
    const customer = new Customer('1', 'John Doe', 'email@test.com', '1234567890');
    const address = new Address('123 Main St', 'Anytown', 'CA', '12345');
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate a customer', () => {
    const customer = new Customer('1', 'John Doe', 'email@test.com', '1234567890');
    const address = new Address('123 Main St', 'Anytown', 'CA', '12345');
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should add reward points to a customer', () => {
    const customer = new Customer('1', 'John Doe', 'email', '1234567890');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(100);
    expect(customer.rewardPoints).toBe(100);
  });
});