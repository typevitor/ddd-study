import { Address } from '../../../../src/domain/customer/value-object/address';

describe('AddressUnitTests', () => {
  
  it('should not create an address with invalid street', () => {
    expect(() => {
      new Address('', 'New York', 'NY', '10001')
    }).toThrow('Street is required');
  });

  it('should not create an address with invalid city', () => {
    expect(() => {
      new Address('123 Main St', '', 'NY', '10001')
    }).toThrow('City is required');
  });

  it('should not create an address with invalid state', () => {
    expect(() => {
      new Address('123 Main St', 'New York', '', '10001')
    }).toThrow('State is required');
  });

  it('should not create an address with invalid zip code', () => {
    expect(() => {
      new Address('123 Main St', 'New York', 'NY', '')
    }).toThrow('Zip code is required');
  });

  it('should create an address with valid data', () => {
    const address = new Address('123 Main St', 'New York', 'NY', '10001');
    expect(address.toString()).toBe('123 Main St, New York, NY 10001');
  });

});