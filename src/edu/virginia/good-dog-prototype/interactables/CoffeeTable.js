'use strict'

class CoffeeTable extends Sprite {
  constructor(id, x, y, w, h, blockSize, color=undefined) {
    super(id, 'sprites/CoffeeTable.png')
    this.position = new Vec2(x*blockSize, y*blockSize);
    this.width = w;
    this.height = h;
    this.blockSize = blockSize;
    this.fillColor = color || "rgba(255, 255, 255, 1.0)"
  }

  getHeight() {
  	return this.height * this.blockSize * this.scale.y;
  }

  getUnscaledHeight() {
  	return this.height * this.blockSize;
  }

  getWidth() {
  	return this.width * this.blockSize * this.scale.x;
  }

  getUnscaledWidth() {
  	return this.width * this.blockSize;
  }
}
