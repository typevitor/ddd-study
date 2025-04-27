import { Address } from "./address";

export class Customer {

  private active: boolean = true;

  constructor(
    private readonly id: number,
    private readonly name: string,
    private readonly email: string,
    private readonly phone: string,
    private readonly address: Address,
  ) {
    this.validate();
  }

  validate(): void {
    if (!this.name) {
      throw new Error('Name is required');
    }
    if (!this.email) {
      throw new Error('Email is required');
    }
    if (!this.phone) {
      throw new Error('Phone is required');
    }
  }
  
  getDetails(): string {
    return `Customer ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Address: ${this.address.toString()}`;
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getEmail(): string {
    return this.email;
  }

  getPhone(): string {
    return this.phone;
  }

  isActive(): boolean {
    return this.active;
  }

  activate(): void {
    if(this.email === '') {
      throw new Error('Email is required to activate the customer');
    }
    this.active = true;
  }
  
  deactivate(): void {
    this.active = false;
  }
}