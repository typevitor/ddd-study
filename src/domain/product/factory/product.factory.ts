import { Product } from "../entity/product";
import { v4 as uuid } from 'uuid';
import { ProductB } from "../entity/product-b";
import ProductInterface from "../entity/product.interface";

export default class ProductFactory {

  static create(type: string, name: string, price: number): ProductInterface {
    if (!name) {
      throw new Error('Name is required');
    }

    if (price <= 0) {
      throw new Error('Price must be greater than zero');
    }

    switch (type) {
      case 'A':
        return new Product(uuid(), name, price);
      case 'B':
        return new ProductB(uuid(), name, price);
      default:
        throw new Error(`Product type ${type} is not supported`);
    }
  }
}