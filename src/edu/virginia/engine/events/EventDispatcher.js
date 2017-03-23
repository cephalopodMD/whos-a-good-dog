"use strict";

class EventDispatcher extends IEventDispatcher {

  constructor() {
    super();
    this.listeners = {};
  }

  addEventListener(listener, eventType) {
    if (!(eventType in this.listeners)) {
      this.listeners[eventType] = new ArrayList();
    }
    this.listeners[eventType].add(listener);
  }

  removeEventListener(listener, eventType) {
    if (eventType in this.listeners) {
      this.listeners[eventType].remove(listener);
    }
  }

  dispatchEvent(e) {
    if (e.eventType in this.listeners) {
      for (let listener of this.listeners[e.eventType].contents) {
        listener.handleEvent(e);
      }
    }
  }

  hasEventListener(listener, eventType) {
    if (eventType in this.listeners) {
      return this.listeners[eventType].contains(listener);
    }
  }

}
