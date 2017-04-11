'use strict';

/**
 * Class for the owner that will chase the dog
 */

// TODO: Extend animated sprite when graphics are available
class Owner extends Sprite {
  constructor(x=0, y=0) {
    var id = 'owner';
    super('owner', 'sprites/mario/0.png');

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
        this.applyForce(new Vec2(xDir * this.parent.clock.getElapsedTime() / 8.0, 0));
        this.applyForce(new Vec2(0, yDir * this.parent.clock.getElapsedTime() / 8.0));
      }

      if (this.target != game.dog)
        for (let poo of game.poos.children.contents)
          if (this.position.sub_i(poo.position).magnitude() < poo.getRadius())
            this.chase();
    }
  }

  checkCollisions(game) {
    //check platform collisions
    var collided = false;
    for (let plat of game.collidables) {
      if (plat.collidesWith(this)) {
        // fix velocity vector after collision instead of zeroing
        // get normal vector by:
        //// transforming Dog to old coords
        var currPos = new Vec2();
        currPos.set(this.position);
        this.setPosition(this.lastPosition.x, this.lastPosition.y);
        //// getting bounding box of dog in plat space
        var box = this.getHitbox(plat)
        //// checking if above, below, left, or right
        var relative = {a:false, b:false, l:false, r:false};
        if (box.x >= plat.getUnscaledWidth())
          relative.r = true;
        if (box.y >= plat.getUnscaledHeight())
          relative.b = true;
        if (box.x <= -box.w)
          relative.l = true;
        if (box.y <= -box.h)
          relative.a = true;
        //// transforming Dog back to real coords
        this.setPosition(currPos.x, currPos.y);
        //// getting bounding box of dog in plat space
        box = this.getHitbox(plat);
        //// choosing appropriate normal vector to edge
        var norm = new Vec2();
        if (relative.r)
          norm = new Vec2(plat.getUnscaledWidth() - box.x, 0);
        if (relative.b)
          norm = new Vec2(0, plat.getUnscaledHeight() - box.y);
        if (relative.l)
          norm = new Vec2(-box.x - box.w, 0);
        if (relative.a)
          norm = new Vec2(0, -box.y - box.h);
        //// transforming vector into world coords
        norm.rotate(plat.rotation);
        norm.scale(plat.scale.x);
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
    for (let plat of game.collidables)
      if (plat.collidesWith(this))
        collided = true;
    if (!collided)
      this.lastPosition.set(this.position);

    for (let room of game.level.rooms) {
      if (this.getHitbox(game).intersectsWith(room.hitbox)) {
        if (this.room != room) {
          // TODO check for poop and interacted with objects here
        }
        this.room == room;
        break;
      }
    }
  }

  setPath(path) {this.path = path;}
  getPath() {return this.path;}

  chase() {
    this.target = Game.getInstance().dog;
    this.dispatchEvent(new Event(Owner.ANGRY_EVENT, this))
  }
}

Owner.ANGRY_EVENT = 'ANGRY_EVENT';
