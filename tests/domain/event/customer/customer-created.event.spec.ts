import { Customer } from '../../../../src/domain/entity/customer';
import { Address } from '../../../../src/domain/entity/address';
import EventDispatcher from '../../../../src/domain/event/@shared/event-dispatcher';
import CustomerCreatedEvent from '../../../../src/domain/event/customer/customer-created.event';
import SendEmailWhenCustomerIsCreated from '../../../../src/domain/event/customer/handler/send-email-when-customer-is-created.handler';
import NotifyAppWhenCustomerIsCreated from '../../../../src/domain/event/customer/handler/notify-app-when-customer-is-created.handler';
import SendEmailWhenCustomerAddressIsChanged from '../../../../src/domain/event/customer/handler/send-email-when-customer-address-is-changed.handler';
import AddressChangedEvent from '../../../../src/domain/event/customer/customer-address-changed.event';

describe('Customer created events Tests', () => {
  it('should notify handlers when customer is created', () => {
    const eventDispatcher = new EventDispatcher();
    const sendEmailHandler = new SendEmailWhenCustomerIsCreated();
    const notifyAppHandler = new NotifyAppWhenCustomerIsCreated();
    eventDispatcher.register('CustomerCreatedEvent', sendEmailHandler);
    eventDispatcher.register('CustomerCreatedEvent', notifyAppHandler);

    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    const customerCreatedEvent = new CustomerCreatedEvent(customer);
    const sendEmailSpy = jest.spyOn(sendEmailHandler, 'handle');
    const notifyAppSpy = jest.spyOn(notifyAppHandler, 'handle');
    
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toHaveLength(2);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0]).toMatchObject(sendEmailHandler);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1]).toMatchObject(notifyAppHandler);

    eventDispatcher.notify(customerCreatedEvent);
    expect(sendEmailSpy).toHaveBeenCalled();
    expect(sendEmailSpy).toHaveBeenCalledWith(customerCreatedEvent);
    expect(sendEmailSpy).toHaveBeenCalledTimes(1);

    expect(notifyAppSpy).toHaveBeenCalled();
    expect(notifyAppSpy).toHaveBeenCalledWith(customerCreatedEvent);
    expect(notifyAppSpy).toHaveBeenCalledTimes(1);
    expect(eventDispatcher.getEventHandlers['CustomerCreatedEvent']).toHaveLength(0);

  });

  it('should notify handler when customer address is changed', () => {
    const eventDispatcher = new EventDispatcher();
    const addressChangedHandler = new SendEmailWhenCustomerAddressIsChanged();

    eventDispatcher.register('CustomerAddressChangedEvent', addressChangedHandler);
    
    const customer = new Customer('a-b-c', 'Customer 1', 'email@test.com', '123456789');
    customer.changeAddress(new Address('Street 1', 'City 1', 'State 1', '1233-33'));
    
    const addressChangedEvent = new AddressChangedEvent(
      customer.getId(),
      customer.getName(),
      customer.getAddress()!
    );
    const addressChangedSpy = jest.spyOn(addressChangedHandler, 'handle');
    
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent']).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers['CustomerAddressChangedEvent'][0]).toMatchObject(addressChangedHandler);
    
    eventDispatcher.notify(addressChangedEvent);
    
    expect(addressChangedSpy).toHaveBeenCalled();
    expect(addressChangedSpy).toHaveBeenCalledWith(addressChangedEvent);
    expect(addressChangedSpy).toHaveBeenCalledTimes(1);
  });
});