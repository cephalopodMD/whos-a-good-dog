'use strict'

class Counter extends Sprite {
  constructor(id, x, y, w, h, blockSize, color=undefined) {
    super(id, 'sprites/counter.png')
    this.position = new Vec2(x*blockSize, y*blockSize);
    this.width = w;
    this.height = h;
    this.setScale(w, h);
    this.blockSize = blockSize;
    this.fillColor = color || "rgba(255, 255, 255, 1.0)"
  }

  getHeight() {
  	return this.blockSize;
  }

  getUnscaledHeight() {
  	return this.blockSize;
  }

  getWidth() {
  	return this.blockSize;
  }

  getUnscaledWidth() {
  	return this.blockSize;
  }
}
