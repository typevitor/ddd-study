import { Order } from "../entity/order";
import { RepositoryInterface } from "./repository_interface.interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {
}