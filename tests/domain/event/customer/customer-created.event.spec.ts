import { Customer } from '../../../../src/domain/entity/customer';
import EventDispatcher from '../../../../src/domain/event/@shared/event-dispatcher';
import CustomerCreatedEvent from '../../../../src/domain/event/customer/customer-created.event';
import SendEmailWhenCustomerIsCreated from '../../../../src/domain/event/customer/handler/send-email-when-customer-is-created.handler';
import NotifyAppWhenCustomerIsCreated from '../../../../src/domain/event/customer/handler/notify-app-when-customer-is-created.handler';

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
});