import { Product } from "../domain/product";
import { RepositoryInterface } from "../../@shared/repository/repository_interface.interface";

export interface ProductRepositoryInterface extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product | null>;
}