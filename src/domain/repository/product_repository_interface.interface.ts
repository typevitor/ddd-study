import { Product } from "../entity/product";
import { RepositoryInterface } from "./repository_interface.interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product | null>;
}