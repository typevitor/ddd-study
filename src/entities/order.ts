export class Order {
  id: string;
  customerId: string;
  orderDate: Date;
  items: OrderItem[];

  constructor(id: string, customerId: string, orderDate: Date, items: OrderItem[]) {
    this.id = id;
    this.customerId = customerId;
    this.orderDate = orderDate;
    this.items = items;
  }
  
  addItem(item: OrderItem): void {
    this.items.push(item);
  }

  removeItem(itemId: string): void {
    this.items = this.items.filter(item => item.id !== itemId);
  }
}