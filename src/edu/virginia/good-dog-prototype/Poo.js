"use strict";

class Poo extends Sprite {

  constructor(game, x, y) {
    super("Poo"+Poo.count, "sprites/poo.png");
    Poo.count += 1;
    this.sprite = this;
    this.position.x = x;
    this.position.y = y;
    this.setScale(.2, .2);
    this.collected = false;
  }

}

Poo.count = 0
