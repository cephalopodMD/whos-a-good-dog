'use strict'

class Vec2 {
  constructor(x=0, y=0) {
    this.x = x;
    this.y = y;
  }

  setx(x) {this.x = x; return this;}
  sety(y) {this.y = y; return this;}
  setxy(x, y) {
    this.x = x;
    this.y = y;
    return this;
  };
  set(p) {
    this.x = p.x;
    this.y = p.y;
    return this;
  }
  getx() {return this.x;}
  gety() {return this.y;}
  getxy() {return {x:this.x, y:this.y};}

  dist(p2) {
    return Math.sqrt((this.x - p2.x)*(this.x - p2.x)^2 + (this.y - p2.y)*(this.y - p2.y));
  }

  magnitude() {
    return Math.sqrt((this.x)*(this.x) + (this.y)*(this.y));
  }

  zero() {this.setxy(0, 0);}

  add(p2) {
    var x = this.x + p2.x,
        y = this.y + p2.y;
    return this.setxy(x, y);
  }

  sub(p2) {
    var x = this.x - p2.x,
        y = this.y - p2.y;
    return this.setxy(x, y);
  }

  scale(s) {
    var x = this.x * s,
        y = this.y * s;
    return this.setxy(x, y);
  }

  transform(matrix) {
    var x = this.x * matrix.a + this.y * matrix.c + matrix.e,
        y = this.x * matrix.b + this.y * matrix.d + matrix.f;
    return this.setxy(x, y);
  }

  // idempotent add
  add_i(p2) {
    var x = this.x + p2.x,
        y = this.y + p2.y;
    return new Vec2(x, y);
  }

  sub_i(p2) {
    var x = this.x - p2.x,
        y = this.y - p2.y;
    return new Vec2(x, y);
  }

  // idempotent scale
  scale_i(s) {
    var x = this.x * s,
        y = this.y * s;
    return new Vec2(x, y);
  }

  // idempotent transform
  transform_i(matrix) {
    var x = this.x * matrix.a + this.y * matrix.c + matrix.e,
        y = this.x * matrix.b + this.y * matrix.d + matrix.f;
    return new Vec2(x, y);
  }

}
