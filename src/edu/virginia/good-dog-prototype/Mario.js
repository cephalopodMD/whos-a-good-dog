'use strict';

class Mario extends AnimatedSprite {
  constructor(x, y) {
    var id = 'mario',
        foldername = 'sprites/mario';
    super(id, foldername, 5);
    this.setSpeed(16);
    this.addAnimation('stand', 0, 0);
    this.addAnimation('run', 0, 4);
    this.addAnimation('jump', 5, 5);
    this.animate('stand');
    this.play();
    this.setPosition(x, y);
    this.lastPosition = new Vec2(this.position.x, this.position.y);
    this.setScale(.5, .5);
    this.setPivotPoint(112/2, 0);
    this.hasPhysics = true;
    this.grounded = false;
    this.running = false;
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    // character specific physics
    this.velocity.x = this.velocity.x * 0.8;
    var gravity = new Vec2(0, 2);
    this.applyForce(gravity);
    if (this.grounded) {
      var normal = new Vec2(0, -2);
      this.applyForce(normal);
      if (Math.abs(this.velocity.x) < .01) {
        //this.velocity.x = 0;
        this.running = false;
        this.animate('stand');
      } else {
        if (!this.running) {
          this.running = true;
          this.animate('run');
        }
      }
    }

		// arrow keys move
		if(pressedKeys.contains(37)) {
      this.applyForce(new Vec2(-this.parent.clock.getElapsedTime() / 4.0, 0));
      this.setScale(-.5, .5);
    }
		if(pressedKeys.contains(39)) {
      this.applyForce(new Vec2(this.parent.clock.getElapsedTime() / 4.0, 0));
      this.setScale(.5, .5);
    }
    if(pressedKeys.contains(32)) this.jump();

    // gamepad buttons move
    if (gamepads[0]) {
			gamepads[0].printGamepadInfo();

      if(gamepads[0].buttonPressedByIndex(14)) {
        this.applyForce(new Vec2(-this.parent.clock.getElapsedTime() / 4.0, 0));
        this.setScale(-.5, .5);
      }
  		if(gamepads[0].buttonPressedByIndex(15)) {
        this.applyForce(new Vec2(this.parent.clock.getElapsedTime() / 4.0, 0));
        this.setScale(.5, .5);
      }
			if(Math.abs(gamepads[0].getLeftStickXAxis()) > 0.1) {
        this.applyForce(new Vec2(gamepads[0].getLeftStickXAxis() * this.parent.clock.getElapsedTime() / 4.0, 0));
        if (gamepads[0].getLeftStickXAxis() > 0)
          this.setScale(.5, .5);
        else
          this.setScale(-.5, .5);
      }
      if(gamepads[0].buttonPressedByIndex(0) || gamepads[0].buttonPressedByIndex(1)) this.jump();
    }
  }

  checkCollisions(game) {
		// check coin collisions
    for (let coin of game.coins) {
    	if (this.collidesWith(coin.sprite) && !coin.collected) {
        coin.collected = true;
    		coin.dispatchEvent(new PickedUpEvent(coin));
    	}
    }

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

  jump() {
    if (this.grounded) {
      this.grounded = false;
      this.running = false;
      this.applyForce(new Vec2(0, -24));
      GoodDogPrototype.soundManager.PlaySoundEffect('jump')
      this.animate('jump');
    }
  }

  draw(g) {
    g.strokeRect(this.getHitbox().x, this.getHitbox().y, this.getHitbox().w, this.getHitbox().h);
    super.draw(g);
  }

  // override height width stuff
  getUnscaledHeight() {
		if (this.frames)
			return this.frames.get(0).height;
  }
  getUnscaledWidth() {
		if (this.frames)
			return this.frames.get(0).width;
  }
}
