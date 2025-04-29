export class OrderItem {
  id: string;
  product: string;
  quantity: number;
  price: number;

  constructor(id: string, product: string, quantity: number, price: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  getTotalPrice(): number {
    return this.quantity * this.price;
  }
}