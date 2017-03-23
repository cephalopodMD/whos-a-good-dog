"use strict";

class Coin extends Sprite {

  constructor(game, x, y) {
    super("Coin", "sprites/Coin.png");
    this.sprite = this;
		game.addChild(this);
		this.position.x = x;
		this.position.y = y;
		this.setScale(.2, .2);
    this.collected = false;
  }

}
