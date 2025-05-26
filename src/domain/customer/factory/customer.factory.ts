import { Customer } from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import { v4 as uuid } from "uuid";
import { Address } from "../value-object/address";

export default class CustomerFactory {
  static create(customerData: {
    name: string;
    email: string;
    phone: string
  }): CustomerInterface {
    const { name, email, phone } = customerData;
    const customer = new Customer(uuid(), name, email, phone);
    return customer;
  }

  static createWithAddress(
    customerData: {
      name: string;
      email: string;
      phone: string
    } ,
    address: Address
  ): CustomerInterface {
    const customer = new Customer(uuid(), customerData.name, customerData.email, customerData.phone);
    customer.changeAddress(address);
    return customer;
  }

}