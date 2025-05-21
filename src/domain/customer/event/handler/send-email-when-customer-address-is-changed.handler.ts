import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendEmailWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    console.log(`Endereço do cliente: ${event.eventData.customerId}, ${event.eventData.customerName} alterado para: ${event.eventData.address.toString()}`);
  }
}