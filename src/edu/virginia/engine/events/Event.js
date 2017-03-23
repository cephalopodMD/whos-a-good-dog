"use strict";

class Event {
  constructor(type, source) {
    this.eventType = type; // String
    this.source = source;  // IEventDispatcher
  }

  getEventType() {
    return this.EventType;
  }
  setEventType(arg) {
    this.EventType = arg;
  }

  getSource() {
    return this.source;
  }
  setSource(arg) {
    this.source = arg;
  }
}
