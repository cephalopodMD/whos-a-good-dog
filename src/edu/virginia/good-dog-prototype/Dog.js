'use strict';

class Dog extends AnimatedSprite {
  constructor(x=0, y=0) {
    var id = 'dog',
        foldername = 'sprites/dog';
    super(id, foldername, 15);
    this.addAnimation('stand', 1, 1);
    this.addAnimation('run', 8, 11);
    this.addAnimation('run_s', 0, 3);
    this.addAnimation('run_w', 4, 7);
    this.addAnimation('run_e', 8, 11);
    this.addAnimation('run_n', 12, 15);
    this.addAnimation('jump', 6, 6);
    this.animate('run_s');
    this.play();

    this.setPosition(x, y);
    this.lastPosition = new Vec2(this.position.x, this.position.y);
    this.setScale(.5, .5);
    this.setPivotPoint(-112/2, -96/2);

    this.hasPhysics = true;
    this.grounded = false;
    this.running = false;
    this.pooTimer = new GameClock();
    this.pooTime = 500;
    this.interactTimer = new GameClock();
    this.interactTime = 500;
    this.addEventListener(GoodDogPrototype.getInstance(), Dog.POO_EVENT);
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    // character specific physics
    this.velocity.scale(.8);
    if (this.velocity.magnitude() < .5) {
      //this.velocity.x = 0;
      if (this.running) {
        this.running = false;
        this.pause();
      }
    } else {
      if (!this.running) {
        this.running = true;
        this.play();
      }
    }

    if((pressedKeys.contains(32) || pressedKeys.contains(81)) && this.pooTimer.getElapsedTime() > this.pooTime) {
      this.poo();
    }
    if (pressedKeys.contains(87) && this.interactTimer.getElapsedTime() > this.interactTime) {
      this.checkInteractions();
    }
    if(pressedKeys.contains(66)) {
      GoodDogPrototype.soundManager.playSoundEffect('yip')
    }

    if (this.pooTimer.getElapsedTime() > this.pooTime) {
      // arrow keys move
      if(pressedKeys.contains(37)) {
        this.applyForce(new Vec2(-this.parent.clock.getElapsedTime() / 8.0, 0));
        this.animate('run_w');
      }
      if(pressedKeys.contains(38)) {
        this.applyForce(new Vec2(0, -this.parent.clock.getElapsedTime() / 8.0));
        this.animate('run_n');
      }
      if(pressedKeys.contains(39)) {
        this.applyForce(new Vec2(this.parent.clock.getElapsedTime() / 8.0, 0));
        this.animate('run_e');
      }
      if(pressedKeys.contains(40)) {
        this.applyForce(new Vec2(0, this.parent.clock.getElapsedTime() / 8.0));
        this.animate('run_s');
      }

      // gamepad buttons move
      if (gamepads[0]) {

        if(gamepads[0].buttonPressedByIndex(12)) {
          this.applyForce(new Vec2(0, -this.parent.clock.getElapsedTime() / 8.0));
          this.animate('run_n');
        }
        if(gamepads[0].buttonPressedByIndex(13)) {
          this.applyForce(new Vec2(0, this.parent.clock.getElapsedTime() / 8.0));
          this.animate('run_s');
        }
        if(gamepads[0].buttonPressedByIndex(14)) {
          this.applyForce(new Vec2(-this.parent.clock.getElapsedTime() / 8.0, 0));
          this.animate('run_w');
        }
        if(gamepads[0].buttonPressedByIndex(15)) {
          this.applyForce(new Vec2(this.parent.clock.getElapsedTime() / 8.0, 0));
          this.animate('run_e');
        }
        if(Math.abs(gamepads[0].getLeftStickYAxis()) > 0.1) {
          this.applyForce(new Vec2(0, gamepads[0].getLeftStickYAxis() * this.parent.clock.getElapsedTime() / 8.0));
          if (Math.abs(gamepads[0].getLeftStickYAxis()) > Math.abs(gamepads[0].getLeftStickXAxis()))
            if (gamepads[0].getLeftStickYAxis() > 0)
              this.animate('run_s');
            else
              this.animate('run_n');
        }
        if(Math.abs(gamepads[0].getLeftStickXAxis()) > 0.1) {
          this.applyForce(new Vec2(gamepads[0].getLeftStickXAxis() * this.parent.clock.getElapsedTime() / 8.0, 0));
          if (Math.abs(gamepads[0].getLeftStickXAxis()) > Math.abs(gamepads[0].getLeftStickYAxis()))
            if (gamepads[0].getLeftStickXAxis() > 0)
              this.animate('run_e');
            else
              this.animate('run_w');
        }
        if(gamepads[0].buttonPressedByIndex(0) || gamepads[0].buttonPressedByIndex(1)) this.poo();
      }
    }
  }

  checkInteractions() {
    var interactableObjects = GoodDogPrototype.getInstance().interactableObjects;
    for (var interactableObj of interactableObjects) {
      var interactBox = interactableObj.getInteractBox();
      if (this.collidesWith(interactBox)) {
        interactableObj.interact();
      }
    }

    // Reset the interaction timer
    this.interactTimer.resetGameClock();
  }

  checkCollisions(game) {
    //check platform collisions
    var collided = false;
    for (let plat of game.platforms) {
      if (plat.collidesWith(this)) {
        // TODO fix velocity vector after collision instead of zeroing
        // get normal vector by:
        //// transforming Mario to old coords
        //// getting bounding box of dog in platform space
        //// checking if above, below, left, or right
        //// transforming Mario back to real coords
        //// getting bounding box of dog in platform space
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

  draw(g) {
    super.draw(g)
  }

  jump() {
    if (this.grounded) {
      this.grounded = false;
      this.running = false;
      this.applyForce(new Vec2(0, -24));
      GoodDogPrototype.soundManager.playSoundEffect('jump')
      this.animate('jump');
    }
  }

  poo() {
    this.pooTime *= 1.1;
    this.velocity = new Vec2();
    var pos;
    if (this.currAnimation == 'run_n')
      pos = new Vec2(this.getHitbox().x + 10, this.getHitbox().y + 45);
    else if (this.currAnimation == 'run_s')
      pos = new Vec2(this.getHitbox().x + 10, this.getHitbox().y - 35);
    else if (this.currAnimation == 'run_e')
      pos = new Vec2(this.getHitbox().x - 32, this.getHitbox().y + 20);
    else if (this.currAnimation == 'run_w')
      pos = new Vec2(this.getHitbox().x + this.getWidth(), this.getHitbox().y + 20);
    else
      pos = new Vec2(this.getHitbox().x, this.getHitbox().y);
    var newPoo = new Poo(pos.x, pos.y);
    var pooIn = new Tween(newPoo);
    pooIn.animate(TweenableParams.X, pos.x+16, pos.x, this.pooTime);
    pooIn.animate(TweenableParams.Y, pos.y+32, pos.y, this.pooTime);
    pooIn.animate(TweenableParams.SCALEX, 0, Poo.scale, this.pooTime);
    pooIn.animate(TweenableParams.SCALEY, 0, Poo.scale, this.pooTime);
    TweenJuggler.add(pooIn);
    this.parent.poos.addChild(newPoo);
    this.pooTimer.resetGameClock();
    this.dispatchEvent(new Event(Dog.POO_EVENT, this));
  }

  pause() {
    this.setDisplayImage(this.frames.itemAt(this.startIndex + 1));
    super.pause();
  }
  getSpeed() {
    return Math.max(4.0, 4 * this.velocity.magnitude());
  }

  // override height width stuff
  getUnscaledHeight() {
    if (this.frames)
      return this.frames.get(this.currFrame).height;
  }
  getUnscaledWidth() {
    if (this.frames)
      return this.frames.get(this.currFrame).width;
  }
}

Dog.POO_EVENT = "POO_EVENT";
