"use strict";

/**
 * A very basic display object for a javascript based gaming engine
 *
 * */
class DisplayObjectContainer extends DisplayObject{

  constructor(id, filename){
    super(id, filename);
    this.children = new ArrayList();
  }

  /**
   * Manage children
   */
  addChild(child) {
    this.children.add(child);
    child.parent = this;
  }
  addChildAtIndex(child, index) {
    this.children.set(child, index);
    child.parent = this;
  }
  removeChild(child) {
    this.children.remove(child);
    child.parent = null;
  }
  removeChildByIndex(index) {
    this.children.removeAt(index);
    child.parent = null;
  }
  removeAllChildren() {
    for (let child of children.contents)
      child.parent = null;
    this.children = new ArrayList();
  }
  contains(child) {
    return this.children.contains(child);
  }
  get(index) {
    return this.children.get(index);
  }
  findById(id) {
    var i;
    for (i=0; i<this.children.size(); i++) {
      child = this.children.get(i);
      if (child.id == id) {
        return child;
      } else if (child instanceof DisplayObjectContainer) {
          found = child.findById(id);
          if (found != null) {
            return found;
          }
      }
    }
    return null;
  }
  getChildren() {
    return this.children;
  }

  update(pressedKeys, gamepads){
    super.update(pressedKeys, gamepads);
    for (let child of this.children.contents) {
      child.update(pressedKeys, gamepads);
    }
  }

  /**
   * Draws this image to the screen
   */
  draw(g){
    this.applyTransformations(g);
    if (this.visible) {
      if (debug) {
        var hb = this.getHitbox(this);
        g.strokeStyle="red";
        g.lineWidth="4";
        g.strokeRect(hb.x, hb.y, hb.w, hb.h);
      }
      if(this.displayImage && this.loaded) {
        g.drawImage(this.displayImage,0,0);
      }
      for(let child of this.children.contents) {
        child.draw(g);
      }
    }
    this.reverseTransformations(g);
  }
}
