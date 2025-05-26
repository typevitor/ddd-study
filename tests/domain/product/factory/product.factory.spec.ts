import ProductFactory from '../../../../src/domain/product/factory/product.factory';

describe('ProductFactoryUnitTest', () => {
  
  it('should create a product type A with valid data', () => {
    const productData = {
      type: 'A',
      name: 'Product 1',
      price: 100,
    };

    const product = ProductFactory.create(productData.type, productData.name, productData.price);

    expect(product).toBeDefined();
    expect(product.getName()).toBe('Product 1');
    expect(product.getPrice()).toBe(100);
    expect(product.constructor.name).toBe('Product');
  });

  it('should create a product type B with valid data', () => {
    const productData = {
      type: 'B',
      name: 'Product 2',
      price: 200,
    };

    const product = ProductFactory.create(productData.type, productData.name, productData.price);

    expect(product).toBeDefined();
    expect(product.getName()).toBe('Product 2');
    expect(product.getPrice()).toBe(400); // Price is doubled in ProductB
    expect(product.constructor.name).toBe('ProductB');
  });

  it('should throw and error when creating a product with an unsupported type', () => {
    const productData = {
      type: 'C',
      name: 'Product 3',
      price: 300,
    };
    expect(() => {
      ProductFactory.create(productData.type, productData.name, productData.price);
    }
    ).toThrow('Product type C is not supported');
  });
});