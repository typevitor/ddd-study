import { Product } from "../../../domain/product/domain/product";

export class ProductService {

  static increasePrice(products: Product[], percentage: number): void {
    products.forEach((product) => {
      const newPrice = product.getPrice() * (1 + percentage / 100);
      product.changePrice(Math.floor(newPrice));
    });
  }
}