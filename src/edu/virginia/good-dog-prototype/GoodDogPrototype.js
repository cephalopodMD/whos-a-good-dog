"use strict";

/**
 * Main class. Instantiate or extend Game to create a new game of your own
 */
class GoodDogPrototype extends Game {

  constructor(canvas){
    super("Who's A Good Dog?", 640, 480, canvas);

    var sm = GoodDogPrototype.soundManager;
    sm.loadSoundEffect('coin', 'sounds/smw_coin.wav');
    sm.loadSoundEffect('jump', 'sounds/smb_jump-small.wav');
    sm.loadSoundEffect('yip', 'sounds/yip.mp3');
    sm.loadMusic('theme', 'sounds/yakety-sax.mp3')
    sm.playMusic('theme');

    // Create level manager
    this.levelManager = new LevelManager();
    this.addEventListener(this.levelManager, LevelCompleteEvent.LEVEL_COMPLETE);
    this.addEventListener(this.levelManager, GameOverEvent.GAME_OVER);

    // Add event listeners for level complete and game over
    this.addEventListener(this, LevelCompleteEvent.LEVEL_COMPLETE);
    this.addEventListener(this, GameOverEvent.GAME_OVER);
    this.levelManager.addEventListener(this, LevelUpdateEvent.LEVEL_UPDATE);
    this.levelManager.addEventListener(this, GameOverEvent.GAME_OVER);

    // Load the info for level 1
    this.loadNextLevel();

    this.clock = new GameClock();
    this.damageValue = 0;

    // Demo
    this.interactText = "";

    // Border size around edge of screen for camera panning
    this.panBorderSize = 200;
  }

  handleEvent(e) {
    if (e.eventType == Dog.POO_EVENT) {
      // TODO fix room poop code
      this.owner.chasing = true;
      for (let room of this.level.rooms) {
        if (e.getSource().getHitbox(this).intersectsWith(room.hitbox)) {
          room.add(e.getSource());
          break;
        }
      }
    } else if (e.eventType == InteractEvent.INTERACT_EVENT) {
      this.interactText = e.getSource().getId();
    } else if (e.eventType == GameOverEvent.GAME_OVER) {
      if (this.levelManager.getCurrentLevel() == this.levelManager.getNumLevels()) {
        this.titleOverlay = new TitleOverlay("TitleOverlay", "You Win", "You're a Bad Dog", this.width, this.height);
      } else {
        this.titleOverlay = new TitleOverlay("TitleOverlay", "You got caught", "ya dingus", this.width, this.height);
      }
      this.pause();
    } else if (e.eventType == LevelUpdateEvent.LEVEL_UPDATE) {
      this.loadNextLevel();
      this.start();
    }

    // Update the money count last to handle restarting the level
    // Do this last since POO_EVENT will update the owner AI
    if (moneyVals[e.eventType]) {
      this.damageValue += moneyVals[e.eventType];

      // Check if the player beat the level
      if (this.damageValue >= this.level.minDamageValue) {
          this.pause();
          this.damageValue = 0;
          this.dispatchEvent(new LevelCompleteEvent(this));
      }
    }
  }

  loadNextLevel() {
    // Remove all children from the game to reset the level
    this.removeAllChildren();

    // Get the info for the level
    switch (this.levelManager.getCurrentLevel()) {
      case 0:
        this.level = LevelFactory.CreateLevelOne();
        break;
      case 1:
        this.level = LevelFactory.CreateLevelTwo();
        break;
    }

    // Add the collidable objects as children of the level
    this.collidables = this.level.collidables;
    for (let plat of this.collidables)
      this.addChild(plat)

    // Keep track of all interactable objects
    this.interactableObjects = this.level.interactableObjects;

    // Create the owner
    this.owner = this.level.owner;
    this.addChild(this.owner);

    // Create the dog and fade it into the level
    this.dog = this.level.dog;
    this.addChild(this.dog);
    var dogFadeIn = new Tween(this.dog);
    dogFadeIn.animate(TweenableParams.ALPHA, 0, 1, 3000);
    TweenJuggler.add(dogFadeIn);

    // Create the poo container
    this.poos = new DisplayObjectContainer('poos');
    this.addChild(this.poos);

    // Initialize the AI for the level
    this.cellSize = 16;
    this.path = [];
    this.ai = undefined;
    // Use setTimeout to let obstacles load
    var callback = function(thiz) {
      // TODO: Change this to use level.width and level.height
      var matrix = GridHelper.CreateObstacleMatrix(thiz.level.width, thiz.level.height, thiz.cellSize, thiz.collidables, 56/2, 48/2);
      thiz.grid = Grid.FromMatrix(matrix);
      thiz.grid.setCellSize(thiz.cellSize);

      // Init AI
      thiz.ai = new PathAI(thiz.grid);
    }
    setTimeout(callback, 500, this);

    // Reset the screen pan
    var dogPos = this.dog.getPosition();
    this.setPosition(this.width/2 - dogPos.x, this.height/2 - dogPos.y);

    // Start Owner AI
    this.owner.target = this.interactableObjects[Math.floor(Math.random() * this.interactableObjects.length)].interactBox;

    // Set the new title overlay for the level
    this.titleOverlay = this.level.titleOverlay;
    this.titleOverlay.fadeOut(1500);
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    // shift
    if (pressedKeys.contains(16))
      debug = true;
    else
      debug = false;

    // Update ai
    if (this.ai)
      this.updateAI();

    // Check collisions
    this.dog.checkCollisions(this);
    this.owner.checkCollisions(this);

    // Attempt to pan the camera with the dog
    this.panCamera();

    // update tweens
    TweenJuggler.nextFrame();

    // reset timings
    this.clock.resetGameClock();
  }

  panCamera() {
    var dogAccel = this.dog.getAcceleration();
    var dogHitbox = this.dog.getHitbox();
    if(dogHitbox.x + dogHitbox.w > this.width - this.panBorderSize)
      if(this.dog.getVelocity().x > 0)
        this.setPosition(this.getPosition().x-Math.abs(this.dog.getVelocity().x)-Math.abs(dogAccel.x), this.getPosition().y);
    if(dogHitbox.x < this.panBorderSize)
      if(this.dog.getVelocity().x < 0)
        this.setPosition(this.getPosition().x+Math.abs(this.dog.getVelocity().x)+Math.abs(dogAccel.x), this.getPosition().y);
    if(dogHitbox.y < this.panBorderSize)
      if(this.dog.getVelocity().y < 0)
        this.setPosition(this.getPosition().x, this.getPosition().y+Math.abs(this.dog.getVelocity().y)+Math.abs(dogAccel.y));
    if(dogHitbox.y + dogHitbox.h > this.height - this.panBorderSize)
      if(this.dog.getVelocity().y > 0)
        this.setPosition(this.getPosition().x, this.getPosition().y-Math.abs(this.dog.getVelocity().y)-Math.abs(dogAccel.y));
  }

  updateAI() {
    // Set the new start cell based on owner position
    // var ownerCell = this.getTraversableGridCell(this.owner);
    var ownerPos = this.owner.getPosition();
    var cellX = (ownerPos.getx()/this.cellSize | 0);
    var cellY = (ownerPos.gety()/this.cellSize | 0);
    var ownerCell = this.grid.getCell(cellX, cellY);

    // Set the new end cell based on dog position
    var targetCell;
    if (this.owner.target instanceof InteractSprite)
      targetCell = this.getTraversableGridCell(this.owner.target.interactBox);
    else
      targetCell = this.getTraversableGridCell(this.owner.target);

    // Reset the cells and find the new path
    this.grid.resetCells();
    this.path = this.ai.aStar(ownerCell, targetCell);
    if (this.owner.running) {
      if (this.path.length > 0) {
        this.owner.setPath(this.path);
      }
      if (this.path.length < 3) {
        if (this.owner.collidesWith(this.owner.target)) {
          if (this.owner.target == this.dog) {
            this.dispatchEvent(new GameOverEvent(this));
          } else {
            if (this.owner.target instanceof OpenableObject)
              this.owner.target.interact();
              this.owner.target = this.interactableObjects[Math.floor(Math.random() * this.interactableObjects.length)].interactBox;
            if (this.owner.target instanceof DestroyObject)
              if (this.owner.target.currentState == 1)
                this.owner.target = this.dog
              else
                this.owner.target = this.interactableObjects[Math.floor(Math.random() * this.interactableObjects.length)].interactBox;
          }
        }
      }
    }
  }

  /**
   * Get the first available grid cell for this sprite that is traversable
   * Used for pathfinding
   */
  getTraversableGridCell(displayObject) {
    var pos = displayObject.getPosition();
    var cellX = (pos.getx()/this.cellSize | 0);
    var cellY = (pos.gety()/this.cellSize | 0);
    var cell = this.grid.getCell(cellX, cellY);

    // If the main cell is not traversable, check all corners
    if (!cell.traversable) {
      // Get the hitbox relative to the game
      // Use game relative coordinates to handle screen pan
      var box = displayObject.getHitbox(this).getxywh();
      var corners = [
        new Vec2(box.x, box.y),
        new Vec2(box.x + box.w, box.y),
        new Vec2(box.x, box.y + box.h),
        new Vec2(box.x + box.w, box.y + box.h)
      ];
      for (var corner of corners) {
        cell = this.grid.getCell(corner.x/this.cellSize | 0, corner.y/this.cellSize | 0);
        if (cell && cell.traversable) {
          break;
        }
      }
    }

    return cell;
  }

  draw(g){
    g.clearRect(0, 0, this.width, this.height);
    super.draw(g);

    this.g.fillStyle = 'black';
    this.g.fillRect(0, 0, 640, 48)

    this.g.fillStyle = "white";
    this.g.font='16px Arial';
    this.g.fillText("$" + this.damageValue + " damage", 16, 30);

    if (this.interactText) {
      this.g.fillText("Interacted with: " + this.interactText, 420, 30);
      // NICE                                                  ^^^
    }

    // if (!this.playing) {
    //   this.g.fillStyle = 'white';
    //   this.g.strokeStyle = 'black'
    //   this.g.lineWidth = 2
    //   this.g.font='bold 48px Arial';
    //   this.g.fillText("PAUSED", 220, 250);
    //   this.g.strokeText("PAUSED", 220, 250);
    //   this.g.font='bold 32px Arial';
    //   this.g.fillText("ya dingus", 250, 300);
    //   this.g.strokeText("ya dingus", 250, 300);
    // }

    // DEBUG: Draw grid
    if (debug && this.grid) {
      this.applyTransformations(g);
      this.grid.drawGrid(g);
      this.grid.drawPath(g, this.path);
      this.reverseTransformations(g);
    }

    // Draw the title overlay over everything else
    // this.level.titleOverlay.draw(g);
    this.titleOverlay.draw(g);
  }

  start() {
    this.clock.resetGameClock();
    super.start();
  }

}


/**
 * THIS IS THE BEGINNING OF THE PROGRAM
 * YOU NEED TO COPY THIS VERBATIM ANYTIME YOU CREATE A GAME
 */
function tick(){
  game.nextFrame();
}

/* Get the drawing canvas off of the  */
GoodDogPrototype.soundManager = new SoundManager();

var drawingCanvas = document.getElementById('game');
var debug = false;
if(drawingCanvas.getContext) {
  var game = new GoodDogPrototype(drawingCanvas);
  game.start();
}
