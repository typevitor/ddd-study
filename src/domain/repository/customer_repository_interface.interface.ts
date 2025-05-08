import { Customer } from "../entity/customer";
import { RepositoryInterface } from "./repository_interface.interface";

export interface CustomerRepositoryInterface extends RepositoryInterface<Customer> {
}