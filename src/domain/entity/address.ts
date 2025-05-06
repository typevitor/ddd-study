export class Address {
  constructor(
    private readonly street: string,
    private readonly city: string,
    private readonly state: string,
    private readonly zipCode: string
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.street) {
      throw new Error('Street is required');
    }
    if (!this.city) {
      throw new Error('City is required');
    }
    if (!this.state) {
      throw new Error('State is required');
    }
    if (!this.zipCode) {
      throw new Error('Zip code is required');
    }
  }

  public toString(): string {
    return `${this.street}, ${this.city}, ${this.state} ${this.zipCode}`;
  }
}