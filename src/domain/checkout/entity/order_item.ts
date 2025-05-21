export class OrderItem {
   
  private id: string;
  private productId: string;
  private quantity: number;
  private price: number;

  constructor(id: string, productId: string, quantity: number, price: number) {
    this.id = id;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;

    this.validate();
  }

  private validate() {
    if (!this.id) {
      throw new Error('ID is required');
    }
    if (!this.productId) {
      throw new Error('Product ID is required');
    }
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (this.price < 0) {
      throw new Error('Price must be greater than zero');
    }
  }

  getTotalPrice(): number {
    return this.quantity * this.price;
  }

  getId(): string {
    return this.id;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getPrice(): number {
    return this.price;
  }

  getProductId(): string {
    return this.productId;
  }
}