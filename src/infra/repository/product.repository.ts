import { Product } from "../../domain/entity/product";
import { ProductRepositoryInterface } from "../../domain/repository/product_repository_interface.interface";
import ProductModel from "../db/sequelize/model/product.model";

export class ProductRepository implements ProductRepositoryInterface {
  
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.getId(),
      name: entity.getName(),
      price: entity.getPrice(),
    });
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.getName(),
        price: entity.getPrice(),
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );
  }

  async find(id: string): Promise<Product | null> {
    const productModel = await ProductModel.findByPk(id);
    if (!productModel) {
      return null;
    }
    return new Product(
      productModel.id,
      productModel.name,
      productModel.price
    );
  }

  async findAll(): Promise<Product[]> {
    // Implementation for finding all products
    return [];
  }

  async findByName(name: string): Promise<Product | null> {
    // Implementation for finding a product by name
    return null;
  }
}