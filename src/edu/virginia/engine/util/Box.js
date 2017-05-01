'using strict'

class Box extends Vec2 {
  constructor(x=0, y=0, w=0, h=0) {
    super(x, y);
    this.w = w;
    this.h = h;
  }

  setw(w) {this.w = w; return this;}
  seth(h) {this.h = h; return this;}
  setwh(w, h) {
    this.w = w;
    this.h = h;
    return this;
  };
  set(b) {
    this.x = b.x;
    this.y = b.y;
    this.b = b.w;
    this.b = b.h;
    return this;
  }
  getw() {return this.w;}
  geth() {return this.h;}
  getwh() {return {w:this.w, h:this.h};}
  getxywh() {return {x:this.x, y:this.y, w:this.w, h:this.h};}

  intersectsWith(hb2) {
    return this.x + this.w > hb2.x &&
           this.y + this.h > hb2.y &&
           this.x < hb2.x + hb2.w &&
           this.y < hb2.y + hb2.h
  }

  isLeftOf(hb2) {
    return this.x < hb2.x - this.w;
  }

  isAbove(hb2) {
    return this.y < hb2.y - this.h;
  }

  isRightOf(hb2) {
    return this.x > hb2.x + hb2.w;
  }

  isBelow(hb2) {
    return this.y > hb2.y + hb2.h;
  }
}
