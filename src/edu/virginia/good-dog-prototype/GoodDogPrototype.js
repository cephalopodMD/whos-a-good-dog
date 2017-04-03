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

    this.poos = new DisplayObjectContainer('poos');
    this.addChild(this.poos);

    this.emitter = new Emitter('coin-emitter', Coin);
    this.emitter.setPosition(320, 240);
    this.addChild(this.emitter);

    this.dog = new Dog(90, 200);
    this.addChild(this.dog);
    var dogFadeIn = new Tween(this.dog);
    dogFadeIn.animate(TweenableParams.ALPHA, 0, 1, 3000);
    TweenJuggler.add(dogFadeIn);

    this.owner = new Owner(80, 80);
    this.addChild(this.owner);

    this.platforms = [
      new Platform('p0', 344, 32),
      new Platform('p1', 344, 296),
      new Platform('p2', 500, 150),
      new Platform('p3', 0, 472),
      new Platform('p4', 160, 472),
      new Platform('p5', 320, 472),
      new Platform('p6', 480, 472),
      new Platform('p7', 10, 0),
      new Platform('p8', 10, 160),
      new Platform('p9', 10, 320),
      new Platform('p10', 0, -40),
      new Platform('p11', 160, -40),
      new Platform('p12', 320, -40),
      new Platform('p13', 480, -40),
      new Platform('p14', 680, 0),
      new Platform('p15', 680, 160),
      new Platform('p16', 680, 320),
    ]
    this.platforms[0].setRotation(Math.PI / 2)
    this.platforms[1].setRotation(Math.PI / 2)
    this.platforms[2].setRotation(Math.PI / 2)

    this.platforms[7].setRotation(Math.PI / 2)
    this.platforms[8].setRotation(Math.PI / 2)
    this.platforms[9].setRotation(Math.PI / 2)
    this.platforms[14].setRotation(Math.PI / 2)
    this.platforms[15].setRotation(Math.PI / 2)
    this.platforms[16].setRotation(Math.PI / 2)

    for (let plat of this.platforms)
      this.addChild(plat);


    // Create new interactable object
    var box0 = new InteractSprite("yellow box", "sprites/gray_box.gif", "sprites/yellow_box.gif");
    box0.setScale(0.2, 0.2);
    box0.setPosition(120, 300);
    box0.moveInteractBox(0, -40);
    this.addChild(box0);

    var box1 = new InteractSprite("green box", "sprites/gray_box.gif", "sprites/green_box.png");
    box1.setScale(0.2, 0.2);
    box1.setPosition(344, 432);
    box1.moveInteractBox(40, 0);
    this.addChild(box1);

    var box2 = new InteractSprite("red box", "sprites/gray_box.gif", "sprites/red_box.png");
    box2.setScale(0.2, 0.2);
    box2.setPosition(584, 8);
    box2.moveInteractBox(0, 40);
    this.addChild(box2);

    this.interactableObjects = [
      box0,
      box1,
      box2
    ];

    this.platforms.push(box0);
    this.platforms.push(box1);
    this.platforms.push(box2);

    this.clock = new GameClock();

    // Init AI
    this.cellSize = 8;
    this.path = [];
    // Use setTimeout to let platforms load
    var callback = function(thiz) {
      var matrix = GridHelper.CreateObstacleMatrix(640, 480, thiz.cellSize, thiz.platforms, 56/2, 48/2);
      thiz.grid = Grid.FromMatrix(matrix);

      // Init AI
      thiz.ai = new PathAI(thiz.grid);
    }
    setTimeout(callback, 500, this);

    // Demo
    this.interactText = "";
  }

  handleEvent(e) {
    if (e.eventType == Dog.POO_EVENT) {
      this.owner.chasing = true;
    } else if (e.eventType == InteractEvent.INTERACT_EVENT) {
      this.interactText = e.getSource().getId();
    }
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    // shift
    if (pressedKeys.contains(16)) {
      debug = true;
    } else {
      debug = false;
    }

    // Update ai
    if (this.ai) {
      this.updateAI();
    }

    // Check collisions
    this.dog.checkCollisions(this);
    this.owner.checkCollisions(this);

    // update tweens
    TweenJuggler.nextFrame();

    // reset timings
    this.clock.resetGameClock();
  }

  updateAI() {
    // Set the new start cell based on owner position
    // var ownerCell = this.getTraversableGridCell(this.owner);
    var ownerPos = this.owner.getPosition();
    var cellX = (ownerPos.getx()/this.cellSize | 0);
    var cellY = (ownerPos.gety()/this.cellSize | 0);
    var ownerCell = this.grid.getCell(cellX, cellY);

    // Set the new end cell based on dog position
    var dogCell = this.getTraversableGridCell(this.dog);

    // Reset the cells and find the new path
    this.grid.resetCells();
    this.path = this.ai.aStar(ownerCell, dogCell);
    if (this.owner.chasing) {
      if (this.path.length > 0) {
        this.owner.setPath(this.path);
      }
      if (this.path.length <= 1) {
        this.pause();
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
      var box = displayObject.getHitbox().getxywh();
      var corners = [
        new Vec2(box.x, box.y),
        new Vec2(box.x + box.w, box.y),
        new Vec2(box.x, box.y + box.h),
        new Vec2(box.x + box.w, box.y + box.h)
      ];
      for (var corner of corners) {
        cell = this.grid.getCell(corner.x/this.cellSize | 0, corner.y/this.cellSize | 0);
        if (cell.traversable) {
          break;
        }
      }
    }

    return cell;
  }

  draw(g){
    /*if(!this.pressedKeys.contains(66)) */ g.clearRect(0, 0, this.width, this.height);
    super.draw(g);

    if (!this.playing) {
      this.g.fillStyle = 'white';
      this.g.font='bold 48px Arial';
      this.g.fillText("YOU GOT CAUGHT!", 100, 250);
      this.g.font='bold 32px Arial';
      this.g.fillText("ya dingus", 250, 300);
    }

    if (this.interactText) {
      this.g.fillStyle = "white";
      this.g.font='16px Arial';
      this.g.fillText("Interacted with: " + this.interactText, 16, 30);
    }

    // DEBUG: Draw grid
    if (debug && this.grid) {
      this.drawGrid(g);
    }

  }

  /**
   * Draw the underlying grid for the A* path finding
   */
  drawGrid(g) {
    var cellSize = this.cellSize;
    var grid = this.grid;
    for (var r = 0; r < grid.numRows; r++) {
      for (var c = 0; c < grid.numCols; c++) {
        var cell = grid.getCell(c, r);
        if (cell.fCost != 0) {
          g.fillStyle = "rgba(0, 255, 255, 0.2)";
          g.fillRect(c*cellSize, r*cellSize, cellSize, cellSize);
        }

        if (!cell.traversable) {
          g.fillStyle = "rgba(0, 0, 0, 0.5)";
          g.fillRect(cell.x*cellSize, cell.y*cellSize, cellSize, cellSize);
        }
      }
    }

    for (var i = 0; i < this.path.length; i++) {
      if (i == 0) {
        g.fillStyle = "rgba(0, 255, 0, 0.5)";
      } else if (i == this.path.length-1) {
        g.fillStyle = "rgba(255, 0, 0, 0.5)";
      } else {
        g.fillStyle = "rgba(0, 255, 255, 0.4)";
      }
      var cell = this.path[i];
      g.fillRect(cell.x*cellSize, cell.y*cellSize, cellSize, cellSize);
    }
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
