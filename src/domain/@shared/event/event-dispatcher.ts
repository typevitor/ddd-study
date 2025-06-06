import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers;
  }

  notify(event: EventInterface): void {
    const eventName = event.constructor.name;
    if (!this.eventHandlers[eventName]) return;

    this.eventHandlers[eventName].forEach((eventHandler) => {
      eventHandler.handle(event);
    });
    this.eventHandlers[eventName] = [];
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }
  
  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) return;

    this.eventHandlers[eventName] = this.eventHandlers[eventName].filter(
      (handler) => handler !== eventHandler
    );
  }
  unregisterAll(): void {
    this.eventHandlers = {};
  }
}