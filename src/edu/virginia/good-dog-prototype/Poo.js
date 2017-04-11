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
    this.cloud.particleLife = 500
    this.hasContainer = false;
    this.addChild(this.cloud);
  }

  update(pressedKeys, gamepads) {
    super.update();
    this.cloud.alpha = Math.min(this.timer.getElapsedTime() / 50000, .2)
    this.cloud.radius = this.timer.getElapsedTime() / 100;
  }

  getRadius() {
    return this.timer.getElapsedTime() / 100
  }

  setContainer(cont)
  {
    this.hasContainer = true;
    this.container = cont;
  }

}

Poo.count = 0
Poo.scale = .2
