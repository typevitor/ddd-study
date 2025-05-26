import { Customer } from "../entity/customer";
import CustomerInterface from "../entity/customer.interface";
import { v4 as uuid } from "uuid";
import { Address } from "../value-object/address";

export default class CustomerFactory {
  static create(customerData: {
    name: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
  }): CustomerInterface {
    const { name, email, phone } = customerData;

    
    const customer = new Customer(uuid(), name, email, phone);

    if (customerData.address) {
      customer.changeAddress(new Address(
        customerData.address.street,
        customerData.address.city,
        customerData.address.state,
        customerData.address.zip
      ));
    }

    return customer;
  }
}