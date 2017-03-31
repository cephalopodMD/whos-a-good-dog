"use strict";

class PickedUpEvent extends Event {
  constructor(poo) {
    super(PickedUpEvent.COIN_PICKED_UP, poo);
  }
}

PickedUpEvent.COIN_PICKED_UP = 'poo picked up';
