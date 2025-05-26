import { Address } from "../value-object/address";
import CustomerInterface from "./customer.interface";

export class Customer implements CustomerInterface {

  private active: boolean = false;
  private address: Address | null = null;
  private _rewardPoints: number = 0;

  constructor(
    private readonly id: string,
    private readonly name: string,
    private readonly email: string,
    private readonly phone: string,
  ) {
    this.validate();
  }

  validate(): void {
    if (!this.id) {
      throw new Error('ID is required');
    }
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

  changeAddress(address: Address): void {
    if (!address) {
      throw new Error('Address is required');
    }
    this.address = address;
  }

  getDetails(): string {
    return `Customer ID: ${this.id}, Name: ${this.name}, Email: ${this.email}, Phone: ${this.phone}, Address: ${this.address?.toString()}`;
  }

  getId(): string {
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

  getAddress(): Address | null {
    return this.address;
  }

  activate(): void {
    if(this.address === null) {
      throw new Error('Address is required to activate the customer');
    }
    this.active = true;
  }
  
  deactivate(): void {
    this.active = false;
  }

  addRewardPoints(points: number): void {
    if (points < 0) {
      throw new Error('Points cannot be negative');
    }
    this._rewardPoints += points;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }
}