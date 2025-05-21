import { Customer } from "../entity/customer";
import { RepositoryInterface } from "../../@shared/repository/repository_interface.interface";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {
}