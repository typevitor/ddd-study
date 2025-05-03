import { OrderItem } from "./order_item";

export class Order {
  private id: string;
  private customerId: string;
  private orderDate: Date;
  private items: OrderItem[];
  private total: number;

  constructor(id: string, customerId: string, orderDate: Date, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.orderDate = orderDate;
    this.items = items;
    this.validate();
    this.total = this.calculateTotal();
  }

  private validate() {
    if (!this.id) {
      throw new Error('ID is required');
    }
    if (!this.customerId) {
      throw new Error('Customer ID is required');
    }
    if( this.items.length === 0) {
      throw new Error('Items are required');
    }

    if (this.items.some(item => item.getQuantity() <= 0)) {
      throw new Error('Quantity must be greater than zero');
    }

    if (this.items.some(item => item.getPrice() < 0)) {
      throw new Error('Price must be greater than zero');
    }
  }
  
  addItem(item: OrderItem): void {
    this.items.push(item);
    this.total = this.calculateTotal();
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.getId() !== itemId);
    this.total = this.calculateTotal();
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getPrice() * item.getQuantity(), 0);
  }

  getItems(): OrderItem[] {
    return this.items;
  }
}