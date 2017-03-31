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
    // sm.playMusic('theme');

    this.mario = new Dog(90, 200);
    this.addChild(this.mario);
    var marioFadeIn = new Tween(this.mario);
    marioFadeIn.animate(TweenableParams.ALPHA, 0, 1, 3000);
    TweenJuggler.add(marioFadeIn);

    this.owner = new Owner(40, 40);
    this.addChild(this.owner);

    this.platforms = [
      new Platform('p0', 350, 30),
      new Platform('p1', 350, 300),
      new Platform('p2', 480, 250),
      new Platform('p3', 0, 470),
      new Platform('p4', 160, 470),
      new Platform('p5', 320, 470),
      new Platform('p6', 480, 470),
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

    this.platforms[7].setRotation(Math.PI / 2)
    this.platforms[8].setRotation(Math.PI / 2)
    this.platforms[9].setRotation(Math.PI / 2)
    this.platforms[14].setRotation(Math.PI / 2)
    this.platforms[15].setRotation(Math.PI / 2)
    this.platforms[16].setRotation(Math.PI / 2)

    for (let plat of this.platforms)
      this.addChild(plat);

    this.coins = new ArrayList([
      new Coin(this, 100, 20),
      new Coin(this, 550, 400),
      new Coin(this, 20, 330),
    ]);
    this.questManager = new QuestManager();
    for (let coin of this.coins.contents) {
      coin.addEventListener(this, PickedUpEvent.COIN_PICKED_UP);
      coin.addEventListener(this.questManager, PickedUpEvent.COIN_PICKED_UP);
    }

    this.clock = new GameClock();

    // Init AI
    this.cellSize = 10;
    var numCols = this.width / this.cellSize;
    var numRows = this.height / this.cellSize;
    this.grid = new Grid(numRows, numCols);
    this.ai = new PathAI(this.grid);
    this.path = [];
  }

  handleEvent(e) {
    if (e.eventType == PickedUpEvent.COIN_PICKED_UP) {
      GoodDogPrototype.soundManager.playSoundEffect('coin');
      var coinZoom = new Tween(e.getSource().sprite, TweenTransitions.quadinout);
      coinZoom.animate(TweenableParams.SCALEX, .2, .8, 1000);
      coinZoom.animate(TweenableParams.SCALEY, .2, .8, 1000);
      coinZoom.animate(TweenableParams.X, e.getSource().sprite.position.x, 200, 1000);
      coinZoom.animate(TweenableParams.Y, e.getSource().sprite.position.y, 150, 1000);
      coinZoom.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
      TweenJuggler.add(coinZoom);
    } else if (e.eventType == TweenEvent.TWEEN_COMPLETE_EVENT) {
      if (e.getTween().object.id == 'Coin') {
        if (e.getSource().object.alpha == 0) {
          this.removeChild(e.getSource().object);
          this.coins.remove(e.getSource().object);
        } else {
          var coinFade = new Tween(e.getSource().object);
          coinFade.animate(TweenableParams.ALPHA, 1, 0, 1000);
          coinFade.addEventListener(this, TweenEvent.TWEEN_COMPLETE_EVENT);
          TweenJuggler.add(coinFade);
        }
      }
    }
  }

  update(pressedKeys, gamepads) {
    super.update(pressedKeys, gamepads);

    // Update ai
    this.updateAI();

    // Check collisions
    this.mario.checkCollisions(this);
    this.owner.checkCollisions(this);

    // update tweens
    TweenJuggler.nextFrame();

    // reset timings
    this.clock.resetGameClock();
  }

  updateAI() {
    // Set the new start cell based on owner position
    var ownerPos = this.owner.getPosition();
    var ownerCellX = (ownerPos.x/this.cellSize) | 0;
    var ownerCellY = (ownerPos.y/this.cellSize) | 0;
    var ownerCell = this.grid.getCell(ownerCellX, ownerCellY);

    // Set the new end cell based on dog position
    var dogPos = this.mario.getPosition();
    var dogCellX = ((dogPos.getx() + this.mario.getUnscaledWidth()/2)/this.cellSize) | 0;
    var dogCellY = ((dogPos.gety() + this.mario.getUnscaledHeight()/2)/this.cellSize) | 0;
    var dogCell = this.grid.getCell(dogCellX, dogCellY);

    // Reset the cells and find the new path
    this.grid.resetCells();
    this.path = this.ai.aStar(ownerCell, dogCell);
    if (!debug || !this.pressedKeys.contains(16)) {
      if (this.path.length > 0) {
        this.owner.setPath(this.path);
      }
    } else {
      this.owner.setPath([]);
    }
  }

  draw(g){
    /*if(!this.pressedKeys.contains(66)) */ g.clearRect(0, 0, this.width, this.height);
    super.draw(g);
    g.font='bold 16px Arial';
    g.fillStyle = 'white';
    g.fillText("Coin grabbed: "+this.questManager.getQuestStatus(PickedUpEvent.COIN_PICKED_UP), 260, 25);

    // DEBUG: Draw grid
    if (debug) {
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
        if (cell.fCost == 0) {
          g.fillStyle = "rgba(0, 0, 0, 0.2)";
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
var debug = true;
if(drawingCanvas.getContext) {
  var game = new GoodDogPrototype(drawingCanvas);
  game.start();
}
