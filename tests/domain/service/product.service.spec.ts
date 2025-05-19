import { Product } from "../../../src/domain/entity/product";
import { ProductService } from "../../../src/domain/service/product.service";

describe('ProductServiceUnitTest', () => {

  it('should change the prices of all products', () => {
    const product1 = new Product('1', 'Product 1', 100);
    const product2 = new Product('2', 'Product 2', 200);
    const product3 = new Product('3', 'Product 3', 300);

    ProductService.increasePrice([product1, product2, product3], 10);

    expect(product1.getPrice()).toBe(110);
    expect(product2.getPrice()).toBe(220);
    expect(product3.getPrice()).toBe(330);
  
  });

});