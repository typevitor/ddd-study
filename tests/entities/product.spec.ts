
import { Product } from '../../src/entities/product';

describe('ProductrUnitTest', () => {

  it('should throw error if create a product with invalid ID', () => {
    expect(() => {
      new Product('', 'Product 1', 100);
    }).toThrow('ID is required');
  });

  it('should throw error if create a product with invalid name', () => {
    expect(() => {
      new Product('1', '', 100);
    }).toThrow('Name is required');
  });

  it('should throw error if create a product price less than zero', () => {
    expect(() => {
      new Product('1', 'Product 1', -100);
    }).toThrow('Price must be greater than zero');
  });

  it('should create a product with valid data', () => {
    const product = new Product('1', 'Product 1', 100);
    expect(product).toBeDefined();
    expect(product.getId()).toBe('1');
    expect(product.getName()).toBe('Product 1');
    expect(product.getPrice()).toBe(100);
  });

  it('should update the product name', () => {
    const product = new Product('1', 'Product 1', 100);
    product.changeName('Product 2');
    expect(product.getName()).toBe('Product 2');
  });
});