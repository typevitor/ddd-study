import { Order } from "../entity/order";
import { RepositoryInterface } from "../../@shared/repository/repository_interface.interface";

export interface OrderRepositoryInterface extends RepositoryInterface<Order> {
}