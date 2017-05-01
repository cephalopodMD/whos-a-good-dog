'use strict';

/**
 * Class for the owner that will chase the dog
 */

// TODO: Extend animated sprite when graphics are available
class Owner extends AnimatedSprite {
  constructor(x=0, y=0) {
    var id = 'owner',
      foldername = 'sprites/Owner';
    super(id, foldername, 36);
    this.addAnimation('stand', 0, 0);
    this.addAnimation('run', 18, 26);
    this.addAnimation('run_s', 0, 8);
    this.addAnimation('run_e', 18, 26);
    this.addAnimation('run_w', 27, 35);
    this.addAnimation('run_n', 9, 17);
    this.animate('run_s');
    this.play();

    // Init the position info
    this.setPosition(x, y);
    this.lastPosition = new Vec2(this.position.x, this.position.y);
    this.setScale(0.35715, 0.25);
    this.setPivotPoint(-20, -20);

    // Set physics and animation flags
    this.hasPhysics = true;
    this.running = true;
    this.chasing = false;

    // Keep track of path to follow
    this.path = [];
    this.room = null;
    this.target = null;

    this.addEventListener(Game.getInstance(), Owner.ANGRY_EVENT)
  }

  update(pressedKeys, gamepads) {
    if (this.parent) {
      super.update(pressedKeys, gamepads);

      // Character specific physics
      this.velocity.scale(0.5);
      // TODO: Update running animation here

      // Apply forces based on the path
      if (this.path.length > 1) {
        var node0 = this.path[0];
        var node1 = this.path[1];

        // Figure out the direction of the forces based on the next node in the path
        var xDir = Math.sign(node1.x - node0.x);
        var yDir = Math.sign(node1.y - node0.y);
        this.applyForce(new Vec2(xDir * this.parent.clock.getElapsedTime() / 12.0, 0));
        this.applyForce(new Vec2(0, yDir * this.parent.clock.getElapsedTime() / 12.0));
      }

      // for 160x160 poo scaled by .1 and 40x40 scaled owner sprite
      var pooMid = new Vec2(8, 8),
          ownerMid = new Vec2(20, 20)
      if (this.target != game.dog)
        for (let poo of game.poos.children.contents)
          // add on the "radius" of the owner ~= 40 * sqrt(2) /2
          if (this.position.add_i(ownerMid).sub_i(poo.position.add_i(pooMid)).magnitude() - 28 < poo.getRadius())
            this.chase();
    }
  }

  checkCollisions(game) {
    //check collidable collisions
    var collided = false;
    for (let c of game.collidables) {
      if (c.collidesWith(this)) {
        // fix velocity vector after collision instead of zeroing
        // get normal vector by:
        //// transforming Dog to old coords
        var currPos = new Vec2();
        currPos.set(this.position);
        this.setPosition(this.lastPosition.x, this.lastPosition.y);
        //// getting bounding box of dog in c space
        var box = this.getHitbox(c)
        //// checking if above, below, left, or right
        var relative = {a:false, b:false, l:false, r:false};
        if (box.x >= c.getUnscaledWidth())
          relative.r = true;
        if (box.y >= c.getUnscaledHeight())
          relative.b = true;
        if (box.x <= -box.w)
          relative.l = true;
        if (box.y <= -box.h)
          relative.a = true;
        //// transforming Dog back to real coords
        this.setPosition(currPos.x, currPos.y);
        //// getting bounding box of dog in c space
        box = this.getHitbox(c);
        //// choosing appropriate normal vector to edge
        var norm = new Vec2();
        if (relative.r)
          norm = new Vec2(c.getUnscaledWidth() - box.x, 0);
        if (relative.b)
          norm = new Vec2(0, c.getUnscaledHeight() - box.y);
        if (relative.l)
          norm = new Vec2(-box.x - box.w, 0);
        if (relative.a)
          norm = new Vec2(0, -box.y - box.h);
        //// transforming vector into world coords
        norm.rotate(c.rotation);
        norm.scale(c.scale.x);
        // get newpos by taking normal vector and adding to current position
        //this.applyForce((new Vec2()).set(norm));
        var newPos = this.position.add_i(norm.scale_i(1.1));
        this.setPosition(newPos.x, newPos.y);
        // get newvel by:
        //// project velocity onto the normal of the normal
        if (norm.magnitude() > 0) {
          norm = new Vec2(norm.y, -norm.x);
          this.velocity = norm.scale_i(norm.dot(this.velocity)/(norm.magnitude()*norm.magnitude()))
        }
      }
    }
    // recheck collisions after the fact

    var collided = false;
    for (let c of game.collidables)
      if (c.collidesWith(this))
        collided = true;
    if (!collided)
      this.lastPosition.set(this.position);
  }

  setPath(path) {this.path = path;}
  getPath() {return this.path;}

  findNewTarget() {
    var intObjs = Game.getInstance().interactableObjects;
    this.target = intObjs[Math.floor(Math.random() * intObjs.length)];
  }

  chase() {
    this.target = Game.getInstance().dog;
    this.dispatchEvent(new Event(Owner.ANGRY_EVENT, this))
  }

  draw(g) {
    if (this.velocity.magnitude() > 1) {
      if (this.velocity.x > Math.abs(this.velocity.y))
      {
        this.animate('run_w');
      }
      if (this.velocity.y > Math.abs(this.velocity.x))
      {
        this.animate('run_s');
      }
      if (this.velocity.x < -Math.abs(this.velocity.y))
      {
        this.animate('run_e');
      }
      if (this.velocity.y < -Math.abs(this.velocity.x))
      {
        this.animate('run_n');
      }
    }
    super.draw(g)
  }
}

Owner.ANGRY_EVENT = 'ANGRY_EVENT';
