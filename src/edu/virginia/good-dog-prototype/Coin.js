"use strict";

class Coin extends Sprite {

  constructor(x=0, y=0) {
    super("Coin"+Coin.count, "sprites/coin.png");
    Coin.count += 1;
    this.sprite = this;
    this.position.x = x;
    this.position.y = y;
    this.setScale(.2, .2);
    this.collected = false;
  }

}

Coin.count = 0
