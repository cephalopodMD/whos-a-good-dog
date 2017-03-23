"use strict";

class PickedUpEvent extends Event {
  constructor(coin) {
    super(PickedUpEvent.COIN_PICKED_UP, coin);
  }
}

PickedUpEvent.COIN_PICKED_UP = 'coin picked up';
