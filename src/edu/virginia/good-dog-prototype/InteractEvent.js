"use strict";

class InteractEvent extends Event {
  constructor(source) {
    super(InteractEvent.INTERACT_EVENT, source);
  }
}

InteractEvent.INTERACT_EVENT = 'INTERACT_EVENT';
