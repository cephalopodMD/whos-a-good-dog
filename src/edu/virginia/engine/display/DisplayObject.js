"use strict";

/**
 * A very basic display object for a javascript based gaming engine
 *
 * */
class DisplayObject extends EventDispatcher {

  constructor(id, filename){
    super()
    this.id = id;
    // Load image file if provided
    if (filename) {
      this.loaded = false;
      this.loadImage(filename);
    } else {
      this.loaded = true;
    }
    this.parent = null;

    this.hasPhysics = false;
    this.mass = 1.0;
    this.forces = [];
    this.acceleration = new Vec2();
    this.velocity = new Vec2();

    this.position = new Vec2();
    this.pivotPoint = new Vec2();
    this.scale = new Vec2(1.0, 1.0);
    this.rotation = 0.0;
    this.alpha = 1.0;
    this.visible = true;
    this.matrix = null;

    this.setPosition(this.position.x, this.position.y)
  }

  /**
   * Loads the image, sets a flag called 'loaded' when the image is ready to be drawn
   */
  loadImage(filename){
    var t = this;
    this.displayImage = new Image();
    this.displayImage.onload = function(){
      t.loaded = true;
    };
    this.displayImage.src = 'resources/' + filename;
  }

  /**
   * Invoked every frame, manually for now, but later automatically if this DO is in DisplayTree
   */
  update(pressedKeys, gamepads){
    if (this.hasPhysics) {
      this.updatePhysics();
    }
  }

  updatePhysics() {
    this.acceleration.zero();

    // sum all forces applied here
    for (let force of this.forces) {
      this.acceleration.add(force.scale(this.mass));
    }
    this.forces = [];

    this.velocity.add(this.acceleration);
    var newPos = this.position.add_i(this.velocity);
    this.setPosition(newPos.x, newPos.y);
  }

  applyForce(force) {
    this.forces.push(force);
  }

  /**
   * Draws this image to the screen
   */
  draw(g){
    this.applyTransformations(g);
    if (debug) {
      var hb = this.getHitbox();
      g.strokeStyle="red";
      g.lineWidth="4";
      g.strokeRect(hb.x, hb.y, hb.w, hb.h);
    }
    if(this.displayImage && this.visible)
      if(this.loaded) g.drawImage(this.displayImage,0,0);
    this.reverseTransformations(g);
  }

  /**
   * Applies transformations for this display object to the given graphics
   * object
   * */
  applyTransformations(g) {
    g.save();
    // move to position
    g.translate(this.position.x, this.position.y);

    // rotate and scale around pivotPoint, then move back
    g.translate(this.pivotPoint.x, this.pivotPoint.y);
    g.rotate(this.rotation);
    g.scale(this.scale.x, this.scale.y);
    g.translate(-this.pivotPoint.x, -this.pivotPoint.y);

    // set alpha
    g.globalAlpha = this.alpha;

    // update matrix
    if (g.isEnhanced) {
      this.matrix = g.getMatrix();
    }
  }

  /**
   * Reverses transformations for this display object to the given graphics
   * object
   * */
  reverseTransformations(g) {
      g.restore();
  }

  /**
   * THIS AREA CONTAINS MOSTLY GETTERS AND SETTERS!
   *
   */
  setId(id){this.id = id;}
  getId(){return this.id;}

  setDisplayImage(image){this.displayImage = image;} //image needs to already be loaded!
  getDisplayImage(){return this.displayImage;}

  getUnscaledHeight(){
    if (this.displayImage)
      return this.displayImage.height;
    return 0;
  }
  getHeight(){
    return this.getUnscaledHeight() * this.scale.y;
  }
  getUnscaledWidth(){
    if (this.displayImage)
      return this.displayImage.width;
    return 0;
  }
  getWidth(){
    return this.getUnscaledWidth() * this.scale.x;
  }

  setVisible(visible){this.visible = visible;}
  getVisible(){return this.visible;}

  /* ==TRANSFORMS========================================================
   * transformations which require a recalculation of the draw matrix
   */

  recalculateMatrix() {
    if (this.matrix != null) {
      this.matrix = (this.parent && this.parent.matrix) ? this.parent.matrix: newMatrix();
      this.matrix = this.matrix.translate(this.position.x, this.position.y);
      this.matrix = this.matrix.translate(this.pivotPoint.x, this.pivotPoint.y);
      this.matrix = this.matrix.rotate(this.rotation);
      this.matrix = this.matrix.scaleNonUniform(this.scale.x, this.scale.y);
      this.matrix = this.matrix.translate(-this.pivotPoint.x, -this.pivotPoint.y);
    }
  }

  setPosition(x, y){
    this.position.setxy(x, y);
    this.recalculateMatrix();
  }
  getPosition(){return this.position;}

  getVelocity(){return this.velocity;}

  getAcceleration(){return this.acceleration;}

  setPivotPoint(x, y){
    this.pivotPoint.setxy(x, y);
    this.recalculateMatrix();
  }
  getPivotPoint(){return this.pivotPoint;}

  setScale(x, y){
    this.scale.setxy(x, y);
    this.recalculateMatrix();
  }
  getScale(){return this.scale;}

  setRotation(rotation){
    this.rotation = rotation;
    this.recalculateMatrix();
  }
  getRotation(){return this.rotation;}

  /* ======================================================================= */

  setAlpha(alpha){this.alpha = alpha;}
  getAlpha(){return this.alpha ;}

  collidesWith(dispObj2) {
    if (dispObj2.matrix == null || this.matrix == null)
      return false;

    // check to see if both display objects are in eachothers bounding boxes
    // when transformed to eachother's coordinate spaces
    return dispObj2.getHitbox(this).intersectsWith(this.getHitbox(this)) &&
           this.getHitbox(dispObj2).intersectsWith(dispObj2.getHitbox(dispObj2));
  }

  getHitbox(relativeTo=null) {
    if (this.matrix == null || (relativeTo != null && relativeTo.matrix == null))
      return {x:0, y:0, w:0, h:0};
    var corners = [
      new Vec2(),
      new Vec2(this.getUnscaledWidth(), 0),
      new Vec2(0, this.getUnscaledHeight()),
      new Vec2(this.getUnscaledWidth(), this.getUnscaledHeight())
    ]
    // transform all of this's corners into this image's coordinate space
    // check to see if inside the resulting bounding box for dispObj2
    var xs = [], ys = []
    for (let p of corners) {
      p.transform(this.matrix)
      if (relativeTo != null)
        p.transform(relativeTo.matrix.inverse());
      xs.push(p.x);
      ys.push(p.y);
    }
    var origin = {x:Math.min(...xs), y:Math.min(...ys)}
    var corner = {x:Math.max(...xs), y:Math.max(...ys)}
    return new Box(origin.x, origin.y, corner.x-origin.x, corner.y-origin.y)
  }

}
