'use strict';

/**
 * Class for the owner that will chase the dog
 */

// TODO: Extend animated sprite when graphics are available
class Owner extends Sprite {
  constructor(x, y) {
    var id = 'owner';
    super('owner', 'sprites/Coin.png');

    // Init the position info
    this.setPosition(x, y);
    this.lastPosition = new Vec2(this.position.x, this.position.y);
    this.setScale(0.15625, 0.15625);
    this.setPivotPoint(-20, -20);

    // Set physics and animation flags
    this.hasPhysics = true;
    this.grounded = false;
    this.running = false;

    // Keep track of path to follow
    this.path = [];
  }

  update(pressedKeys, gamepads) {
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
  }

  checkCollisions(game) {
    //check platform collisions
    var collided = false;
    for (let plat of game.platforms) {
      if (plat.collidesWith(this)) {
        // get normal vector by:
        //// transforming Mario to old coords
        //// getting bounding box of mario in platform space
        //// checking if above, below, left, or right
        //// transforming Mario back to real coords
        //// getting bounding box of mario in platform space
        //// choosing appropriate normal vector to edge
        //// transforming vector into world coords
        // get newpos by:
        //// taking normal vector
        //// adding to current position
        // get newvel by:
        //// taking normal vector
        //// rotating 90 degrees - new Vec2(y, -x)
        //// projecting this.velocity onto rotated normal vector
        //*
        var i = 0
        while (plat.collidesWith(this) && i < 10) {
          var newpos = this.position.add_i(this.lastPosition.sub_i(this.position).scale_i(0.45));
          this.setPosition(newpos.x, newpos.y);
          i++;
        }
        //*
        collided = true;
        if (!this.grounded &&
          this.velocity.y>0 &&
          this.velocity.y>Math.abs(this.velocity.x) &&
          this.lastPosition.y<plat.position.y-this.getHeight()) {
          this.grounded = true;
          var normal = new Vec2(0, -2);
          this.applyForce(normal);
        }
        this.velocity = new Vec2();
        break;
      }
    }
    if (!collided) {
      this.lastPosition.set(this.position);
      if (this.grounded) {
        var onPlatform = false,
        groundPoints = [
          new Vec2(this.getHitbox().x, this.getHitbox().y+this.getHitbox().h+2),
          new Vec2(this.getHitbox().x+this.getHitbox().w, this.getHitbox().y+this.getHitbox().h+2),
        ];
        for (let plat of game.platforms) {
          //check that at least one platform is under if grounded
          for (let point of groundPoints) {
            var transformedPoint = point.transform_i(plat.matrix.inverse());
            if (transformedPoint.x > 0 && transformedPoint.x < plat.getUnscaledWidth() &&
                transformedPoint.y > 0 && transformedPoint.y < plat.getUnscaledHeight()) {
              onPlatform = true;
              break;
            }
          }
        }
        if (!onPlatform) {
          this.grounded = false;
        }
      }
    }
  }

  setPath(path) {this.path = path;}
  getPath() {return this.path;}


}