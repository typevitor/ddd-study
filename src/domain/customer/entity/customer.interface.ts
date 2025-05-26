import { Address } from "../value-object/address";

export default interface CustomerInterface {

  getId(): string;
  getName(): string;
  getEmail(): string;
  getAddress(): Address | undefined;

  changeAddress(adress: Address): void;

  validate(): void;
}