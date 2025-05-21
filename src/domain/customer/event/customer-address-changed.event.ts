import { Address } from "../value-object/address";
import EventInterface from "../../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: any;

  constructor(clientId: string, clientName: string, address: Address) {
    this.dataTimeOccurred = new Date();
    this.eventData = {
      customerId: clientId,
      customerName: clientName,
      address
    };
  }
}