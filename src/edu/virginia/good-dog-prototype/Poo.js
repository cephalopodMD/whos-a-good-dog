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
    this.cloud = new Emitter(this.id+'_cloud', Sprite, this.id+'_cloud_particle', "sprites/poo.png")
    this.cloud.alpha = 0;
    this.cloud.radius = 10;
    this.cloud.particleLife = 500
    this.suppression = 1.0;
    this.hasContainer = false;
    this.container = null;
    this.addChild(this.cloud);
  }

  update(pressedKeys, gamepads) {
    super.update();
    if (this.cloud.alpha < .2 * this.suppression)
      this.cloud.alpha += this.suppression * this.timer.getElapsedTime() / 50000
    if (this.cloud.radius < 100 * this.suppression)
      this.cloud.radius += this.suppression * this.timer.getElapsedTime() / 50;
    this.timer.resetGameClock();
  }

  getRadius() {
    return this.cloud.radius;
  }

  setContainer(cont)
  {
    this.hasContainer = true;
    this.container = cont;
  }
}

Poo.count = 0
Poo.scale = .2
