"use strict";

class Poo extends Sprite {

  constructor(x=0, y=0) {
    super("Poo"+Poo.count, "sprites/poo.png");
    Poo.count += 1;
    this.sprite = this;
    this.position.x = x;
    this.position.y = y;
    this.setScale(Poo.scale, Poo.scale);
    this.collected = false;
    this.timer = new GameClock()
    this.cloud = new Sprite('cloud', 'sprites/circle-xxl.png')
    this.cloud.alpha = 0.5;
    this.cloud.setScale(.1, .1);
    this.cloud.setPosition(80, 80);
    this.addChild(this.cloud);
    this.suppression = 1.0;
    this.hasContainer = false;
    this.container = null;
  }

  update(pressedKeys, gamepads) {
    super.update();
    if (this.cloud.alpha < .2 * this.suppression)
      this.cloud.alpha += this.suppression * this.timer.getElapsedTime() / 50000
    if (this.cloud.scale.x < 100 * this.suppression) {
      var scaleFactor = this.suppression * this.timer.getElapsedTime() / 5000;
      this.cloud.scale.x += scaleFactor;
      this.cloud.scale.y += scaleFactor;
      this.cloud.position.x -= scaleFactor*140;
      this.cloud.position.y -= scaleFactor*140;
      this.cloud.recalculateMatrix();
    }
    this.timer.resetGameClock();
  }

  getRadius() {
    return this.cloud.scale.x * 256 * 0.1;
  }

  setContainer(cont)
  {
    this.hasContainer = true;
    this.container = cont;
  }
}

Poo.count = 0
Poo.scale = .2
