'use strict'

class Platform extends Sprite {
  constructor(id, x, y) {
    super(id, 'sprites/platform.png')
    this.position = new Vec2(x, y);
    this.setScale(.2, .2);
  }
}
