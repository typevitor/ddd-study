import EventDispatcher from '../../../../src/domain/event/@shared/event-dispatcher';
import SendEmailWhenProductIsCreated from '../../../../src/domain/event/product/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../../../src/domain/event/product/product-created.event';

describe('Domain events Tests', () => {
  it('should register an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreated();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
  });

  it('should unregister an event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreated();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreated();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(1);
    eventDispatcher.unregisterAll();
    expect(eventDispatcher.getEventHandlers).toEqual({});
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
  });

  it('should notify all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreated();
    eventDispatcher.register('ProductCreatedEvent', eventHandler);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(1);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    const productEvent = new ProductCreatedEvent({
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      price: 100,
      createdAt: new Date(),
    });
    const spyEventHandler = jest.spyOn(eventHandler, 'handle');

    eventDispatcher.notify(productEvent);

    expect(spyEventHandler).toHaveBeenCalledTimes(1);
    expect(spyEventHandler).toHaveBeenCalledWith(productEvent);
    expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toHaveLength(0);
  });
});