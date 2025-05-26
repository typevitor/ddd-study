export default interface ProductInterface {
  getId(): string;
  getName(): string;
  getPrice(): number;

  changeName(name: string): void;
  changePrice(price: number): void;
}