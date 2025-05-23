import { Address } from "../../../../domain/customer/value-object/address";
import { Customer } from "../../../../domain/customer/entity/customer";
import { CustomerRepositoryInterface } from "../../../../domain/customer/repository/customer_repository_interface.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.getId(),
      name: entity.getName(),
      email: entity.getEmail(),
      phone: entity.getPhone(),
      active: entity.isActive(),
      street: entity.getAddress()?.getStreet(),
      city: entity.getAddress()?.getCity(),
      state: entity.getAddress()?.getState(),
      zipCode: entity.getAddress()?.getZipCode(),
      rewardPoints: 0
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.getName(),
        email: entity.getEmail(),
        phone: entity.getPhone(),
        active: entity.isActive(),
        street: entity.getAddress().getStreet(),
        city: entity.getAddress().getCity(),
        state: entity.getAddress().getState(),
        zipCode: entity.getAddress().getZipCode(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.getId(),
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel: CustomerModel;
    try {
      customerModel = await CustomerModel.findByPk(id);
    } catch (error) {
      throw new Error(`Customer not found`);
    }
    const customer = new Customer(
      customerModel.id,
      customerModel.name,
      customerModel.email,
      customerModel.phone,
    );
    customer.changeAddress(new Address(
      customerModel.street,
      customerModel.city,
      customerModel.state,
      customerModel.zipCode,
    ));

    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    return CustomerModel.findAll().then((customers) => {
      return customers.map((customer) => {
        const customerEntity =  new Customer(
          customer.id,
          customer.name,
          customer.email,
          customer.phone,
        );

        customerEntity.changeAddress(new Address(
          customer.street,
          customer.city,
          customer.state,
          customer.zipCode,
        ));

        if (customer.active) {
          customerEntity.activate();
        }

        return customerEntity;
      });
    });
  }
}