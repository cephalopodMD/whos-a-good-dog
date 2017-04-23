'use strict';

class Dog extends AnimatedSprite {
  constructor(x=0, y=0) {
    var id = 'dog',
        foldername = 'sprites/dog';
    super(id, foldername, 16);
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
    this.setScale(.5, .5);
    this.setPivotPoint(-112/2, -96/2);
    this.lastPosition = new Vec2(this.position.x, this.position.y);

    this.hasPhysics = true;
    this.grounded = false;
    this.running = false;
    this.speedFactor = .1;
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

    if((pressedKeys.contains(32) || pressedKeys.contains(81) || pressedKeys.contains(90)) && this.pooTimer.getElapsedTime() > this.pooTime)
      this.pooInteract();
    if ((pressedKeys.contains(87) || pressedKeys.contains(88)) && this.interactTimer.getElapsedTime() > this.interactTime)
      this.checkInteractions();
    if(pressedKeys.contains(66))
      GoodDogPrototype.soundManager.playSoundEffect('yip')

    if (this.pooTimer.getElapsedTime() > this.pooTime) {
      // arrow keys move
      if(pressedKeys.contains(37))
        this.applyForce(new Vec2(-this.parent.clock.getElapsedTime() * this.speedFactor, 0));
      if(pressedKeys.contains(38))
        this.applyForce(new Vec2(0, -this.parent.clock.getElapsedTime() * this.speedFactor));
      if(pressedKeys.contains(39))
        this.applyForce(new Vec2(this.parent.clock.getElapsedTime() * this.speedFactor, 0));
      if(pressedKeys.contains(40))
        this.applyForce(new Vec2(0, this.parent.clock.getElapsedTime() * this.speedFactor));

      // gamepad buttons move
      if (gamepads[0]) {
        if(gamepads[0].buttonPressedByIndex(12))
          this.applyForce(new Vec2(0, -this.parent.clock.getElapsedTime() * this.speedFactor));
        if(gamepads[0].buttonPressedByIndex(13))
          this.applyForce(new Vec2(0, this.parent.clock.getElapsedTime() * this.speedFactor));
        if(gamepads[0].buttonPressedByIndex(14))
          this.applyForce(new Vec2(-this.parent.clock.getElapsedTime() * this.speedFactor, 0));
        if(gamepads[0].buttonPressedByIndex(15))
          this.applyForce(new Vec2(this.parent.clock.getElapsedTime() * this.speedFactor, 0));
        if(Math.abs(gamepads[0].getLeftStickYAxis()) > 0.1)
          this.applyForce(new Vec2(0, gamepads[0].getLeftStickYAxis() * this.parent.clock.getElapsedTime() * this.speedFactor));
        if(Math.abs(gamepads[0].getLeftStickXAxis()) > 0.1)
          this.applyForce(new Vec2(gamepads[0].getLeftStickXAxis() * this.parent.clock.getElapsedTime() * this.speedFactor, 0));
        if(gamepads[0].buttonPressedByIndex(0) || gamepads[0].buttonPressedByIndex(1)) this.poo();
      }
    }
  }

  checkInteractions() {
    var interactableObjects = GoodDogPrototype.getInstance().interactableObjects;
    for (var interactableObj of interactableObjects) {
      var interactBox = interactableObj.getInteractBox();
      if (this.collidesWith(interactBox))
        interactableObj.interact();
    }
    // Reset the interaction timer
    this.interactTimer.resetGameClock();
  }

  checkCollisions(game) {
    //check platform collisions
    for (let plat of game.collidables) {
      var i = 0;
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
  }

  draw(g) {
    if (this.velocity.magnitude() > 1) {
      if (this.velocity.x > Math.abs(this.velocity.y))
        this.animate('run_e');
      if (this.velocity.y > Math.abs(this.velocity.x))
        this.animate('run_s');
      if (this.velocity.x < -Math.abs(this.velocity.y))
        this.animate('run_w');
      if (this.velocity.y < -Math.abs(this.velocity.x))
        this.animate('run_n');
    }
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
    this.pooTime *= 1.2;
    this.velocity = new Vec2();
    var pos;
    var relativeHitbox = this.getHitbox(this.parent);
    if (this.currAnimation == 'run_n')
      pos = new Vec2(relativeHitbox.x + 10, relativeHitbox.y + 45);
    else if (this.currAnimation == 'run_s')
      pos = new Vec2(relativeHitbox.x + 10, relativeHitbox.y - 35);
    else if (this.currAnimation == 'run_e')
      pos = new Vec2(relativeHitbox.x - 32, relativeHitbox.y + 20);
    else if (this.currAnimation == 'run_w')
      pos = new Vec2(relativeHitbox.x + this.getWidth(), relativeHitbox.y + 20);
    else
      pos = new Vec2(relativeHitbox.x, relativeHitbox.y);
    var newPoo = new Poo(pos.x, pos.y);
    var pooIn = new Tween(newPoo);
    pooIn.animate(TweenableParams.X, pos.x+16, pos.x, this.pooTime);
    pooIn.animate(TweenableParams.Y, pos.y+32, pos.y, this.pooTime);
    pooIn.animate(TweenableParams.SCALEX, 0, Poo.scale, this.pooTime);
    pooIn.animate(TweenableParams.SCALEY, 0, Poo.scale, this.pooTime);
    TweenJuggler.add(pooIn);
    this.parent.poos.addChild(newPoo);
    this.pooTimer.resetGameClock();
    this.dispatchEvent(new Event(Dog.POO_EVENT, newPoo));
  }

  pooInteract() {
    var flag = true;
    var interactableObjects = GoodDogPrototype.getInstance().interactableObjects;
    for (var interactableObj of interactableObjects) {
      var interactBox = interactableObj.getInteractBox();
      if (this.collidesWith(interactBox))
      {
        if(interactableObj.isPoopable())
        {
          this.pooTime *= 1.1;
          this.velocity = new Vec2();
          var pos = interactableObj.getHitbox(this.parent);
          pos.setxy(pos.x + interactableObj.getPoopLocation().x, pos.y + interactableObj.getPoopLocation().y)
          var newPoo = new Poo(pos.x, pos.y);
          var pooIn = new Tween(newPoo);
          pooIn.animate(TweenableParams.X, pos.x, pos.x, this.pooTime);
          pooIn.animate(TweenableParams.Y, pos.y, pos.y, this.pooTime);
          pooIn.animate(TweenableParams.SCALEX, 0, Poo.scale, this.pooTime);
          pooIn.animate(TweenableParams.SCALEY, 0, Poo.scale, this.pooTime);
          TweenJuggler.add(pooIn);
          this.parent.poos.addChild(newPoo);
          this.pooTimer.resetGameClock();
          this.dispatchEvent(new Event(Dog.POO_EVENT, newPoo));
          interactableObj.poopIn(newPoo);
          newPoo.setContainer(interactableObj);
          flag = false;
        }
      }
    }
    if(flag)
    {
      this.poo();
    }
    // Reset the interaction timer
    this.interactTimer.resetGameClock();
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
    return 96;
  }
  getUnscaledWidth() {
    return 112;
  }
}

Dog.POO_EVENT = "POO_EVENT";
