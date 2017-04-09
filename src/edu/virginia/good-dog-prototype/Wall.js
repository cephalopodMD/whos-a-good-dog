'use strict'

class Wall extends Sprite {
  constructor(id, x, y, w, h, blockSize) {
    super(id, 'sprites/wall_placeholder.png')
    this.position = new Vec2(x*blockSize, y*blockSize);
    this.width = w;
    this.height = h;
    this.blockSize = blockSize;
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
