export class Product {

  constructor(
    private readonly id: string,
    private name: string,
    private price: number,
  ) {
    this.validate();
  }

  getId(): string {
    return this.id;
  }
  getName(): string {
    return this.name;
  }
  getPrice(): number {
    return this.price;
  }

  private validate() {
    if (!this.id) {
      throw new Error('ID is required');
    }

    if (!this.name) {
      throw new Error('Name is required');
    }

    if (this.price <= 0) {
      throw new Error('Price must be greater than zero');
    }
  }

  changeName(name: string): void {
    this.name = name;
    this.validate();
  }

  changePrice(price: number): void {
    this.price = price;
    this.validate();
  }
}